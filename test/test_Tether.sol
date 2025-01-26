// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Tether.sol";

contract TestTether is Tether {
    Tether tether = Tether(DeployedAddresses.Tether());

    function testInitialBalanceUsingDeployedContract() public {
        uint expected = 1000000000000000000000000;
        Assert.equal(
            tether.balanceOf(tx.origin),
            expected,
            "Owner should have 1 million Tether initially"
        );
    }

    function testTransfer() public {
        //Tether tether = new Tether();
        address recipient = address(0x123);
        uint amount = 1000;

        bool success = tether.transfer(recipient, amount);
        Assert.isTrue(success, "Transfer should return true");

        uint recipientBalance = tether.balanceOf(recipient);
        Assert.equal(
            recipientBalance,
            amount,
            "Recipient should have received 1000 Tether"
        );

        uint ownerBalance = tether.balanceOf(address(this));
        Assert.equal(
            ownerBalance,
            tether.totalSupply() - amount,
            "Owner should have 1 million Tether minus 1000"
        );
    }

    function testApproveAndTransferFrom() public {
        //Tether tether = new Tether();
        address spender = address(this);
        address recipient = address(0x456);
        uint amount = 500;

        bool success = tether.approve(spender, amount);
        Assert.isTrue(success, "Approve should return true");

        uint allowance = tether.allowance(address(this), spender);
        Assert.equal(allowance, amount, "Allowance should be 500 Tether");

        success = tether.transferFrom(address(this), recipient, amount);
        Assert.isTrue(success, "TransferFrom should return true");

        uint recipientBalance = tether.balanceOf(recipient);
        Assert.equal(
            recipientBalance,
            amount,
            "Recipient should have received 500 Tether"
        );

        uint ownerBalance = tether.balanceOf(address(this));
        Assert.equal(
            ownerBalance,
            tether.totalSupply() - amount,
            "Owner should have 1 million Tether minus 500"
        );
    }
}
