// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract GreetingPortal {

    event NewGreeting(uint32 id, address indexed from, string name, string message, uint256 timestamp);

    uint32 totalGreetings;
    uint256 private seed;

    struct Greeter {
        address greeter;
        string name;
        string message;
        uint256 timestamp;
    }

    Greeter[] public greeters;

    mapping(uint32 => address) public greetingToGreeter;
    mapping(address => uint256) public lastGreetAt;

    constructor() payable {
        console.log("yo yo, I am a contract and I am smart");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    // @devs greet will take a name and the message of the greeting
    // and then add +1 to totalGreetings

    function greet(string memory _name, string memory _myMessage) public {
        require(lastGreetAt[msg.sender] + 15 minutes < block.timestamp, "Wait 10m");
        lastGreetAt[msg.sender] = block.timestamp;

        greeters.push(Greeter(msg.sender, _name, _myMessage, block.timestamp));
        uint32 id = uint32(greeters.length - 1);
        greetingToGreeter[id] = msg.sender;
        totalGreetings++;

        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random number generated:", seed);

        if (seed <= 50) {
            console.log("Prize won!", msg.sender);
            uint256 prizeAmount = .00008 ether;
            require(
            prizeAmount <= address(this).balance, "Contract is out of funds!"
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from the contract");
        }

        emit NewGreeting(id, msg.sender, _name, _myMessage, block.timestamp);
        console.log("greetingToGreeter[id]:", greetingToGreeter[id]);
        console.log("%s has waved!", msg.sender);
        console.log("Id of greet", id);
    }

    // this will return the struct array, Greeter[], back to us.
    function getAllGreetings() public view returns (Greeter[] memory) {
        return greeters;
    }

    // take in id of the greeting
    // returns the name and message of greeter
    function getGreetings(uint32 _id) public view returns (string memory, string memory) {
        Greeter storage myGreeting = greeters[_id];
        console.log("myGreeting name", myGreeting.name);
        console.log("myGreeting message", myGreeting.message);
        return (myGreeting.name, myGreeting.message);
    }

    function getTotalGreetings() public view returns (uint256) {
        console.log("Total amount of greetings:", totalGreetings);
        return totalGreetings;
    }
}
