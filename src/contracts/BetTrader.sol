// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract BetTrader {
    // Structure for each bet
    struct Bet {
        address creator; // Address of the person who created the bet
        address taker; // Address of the person who took the bet
        uint256 amount; // Amount of Ether bet
        string description; // Description of the bet
        bool resolved; // Whether the bet has been resolved
        bool result; // The result of the bet (true or false)
    }

    // Array to store all bets
    Bet[] public bets;

    // Event to log when a new bet is created
    event BetCreated(
        uint256 betId,
        address creator,
        uint256 amount,
        string description
    );

    // Event to log when a bet is taken
    event BetTaken(uint256 betId, address taker);

    // Event to log when a bet is resolved
    event BetResolved(uint256 betId, bool result);

    // Function to create a new bet
    function createBet(string memory _description) public payable {
        require(msg.value > 0, "Bet amount must be greater than 0");
        bets.push(
            Bet({
                creator: msg.sender,
                taker: address(0), // No taker yet
                amount: msg.value,
                description: _description,
                resolved: false,
                result: false
            })
        );
        emit BetCreated(bets.length - 1, msg.sender, msg.value, _description);
    }

    // Function for another user to take the bet
    function takeBet(uint256 _betId) public payable {
        Bet storage bet = bets[_betId];
        require(bet.taker == address(0), "This bet has already been taken");
        require(msg.value == bet.amount, "Must match the bet amount");
        bet.taker = msg.sender;
        emit BetTaken(_betId, msg.sender);
    }

    // Function to resolve the bet (only the creator can do this)
    function resolveBet(uint256 _betId, bool _result) public {
        Bet storage bet = bets[_betId];
        require(
            msg.sender == bet.creator,
            "Only the bet creator can resolve the bet"
        );
        require(!bet.resolved, "Bet has already been resolved");
        bet.resolved = true;
        bet.result = _result;
        emit BetResolved(_betId, _result);

        // Pay out the winner
        if (_result) {
            payable(bet.creator).transfer(bet.amount * 2); // Winner gets both sides of the bet
        } else {
            payable(bet.taker).transfer(bet.amount * 2);
        }
    }

    // Function to get the status of a bet
    function getBetStatus(
        uint256 _betId
    ) public view returns (bool resolved, bool result) {
        Bet memory bet = bets[_betId];
        return (bet.resolved, bet.result);
    }

    // Function to get the number of bets
    function getBetCount() public view returns (uint256) {
        return bets.length;
    }
}

// Note:

// This is a basic and simplified version. Real-world applications would need to include more sophisticated logic, such as:
// Handling disputes or disputes resolution mechanisms.
// Incorporating oracles for external data verification if bets depend on real-world outcomes.
// Implementing security measures against common vulnerabilities in smart contracts.
// Adding features like bet cancellation or modifications before they are taken.
// Always have smart contracts audited by professionals before deploying them on a live blockchain due to the immutable nature of smart contracts once deployed.
// This example does not include error handling for gas limitations, which in practice would be crucial.
