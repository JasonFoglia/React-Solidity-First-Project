// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract InsurancePolicy {
    address public owner;
    mapping(address => Policy) public policies;

    struct Policy {
        uint256 premium;
        uint256 coverageAmount;
        uint256 coveragePeriodEnd;
        bool active;
        bool claimMade;
    }

    event PolicyCreated(
        address indexed insured,
        uint256 premium,
        uint256 coverageAmount
    );
    event ClaimMade(address indexed insured, uint256 amount);
    event PolicyCancelled(address indexed insured);

    constructor() {
        owner = msg.sender;
    }

    // Function to create a new insurance policy
    function createPolicy(
        uint256 _premium,
        uint256 _coverageAmount,
        uint256 _durationInDays
    ) public payable {
        require(
            msg.value == _premium,
            "Premium payment must match the policy premium"
        );
        require(
            policies[msg.sender].active == false,
            "You already have an active policy"
        );

        uint256 coveragePeriodEnd = block.timestamp +
            (_durationInDays * 1 days);
        policies[msg.sender] = Policy({
            premium: _premium,
            coverageAmount: _coverageAmount,
            coveragePeriodEnd: coveragePeriodEnd,
            active: true,
            claimMade: false
        });

        emit PolicyCreated(msg.sender, _premium, _coverageAmount);
    }

    // Function to make a claim
    function makeClaim() public {
        Policy storage policy = policies[msg.sender];
        require(policy.active == true, "Policy is not active");
        require(policy.claimMade == false, "Claim has already been made");
        require(
            block.timestamp < policy.coveragePeriodEnd,
            "Policy has expired"
        );

        policy.claimMade = true;
        payable(msg.sender).transfer(policy.coverageAmount);
        emit ClaimMade(msg.sender, policy.coverageAmount);
    }

    // Function to cancel a policy
    function cancelPolicy() public {
        Policy storage policy = policies[msg.sender];
        require(policy.active == true, "No active policy to cancel");
        require(
            policy.claimMade == false,
            "Claim has already been made on this policy"
        );

        uint256 refund = (policy.premium *
            (policy.coveragePeriodEnd - block.timestamp)) /
            (policy.coveragePeriodEnd - policy.premium);
        payable(msg.sender).transfer(refund);
        policy.active = false;
        emit PolicyCancelled(msg.sender);
    }

    // Function to withdraw all funds (only owner can call this)
    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw funds");
        payable(owner).transfer(address(this).balance);
    }
}
