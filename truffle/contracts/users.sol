// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Users {

    uint public _userCount = 0;

    struct User {
        string _firstname;
        string _lastname;
        string _email;
        uint _age;
    }

    mapping(address => User) public _users;

    function addUser(string memory _firstname, string memory _lastname, string memory _email, uint _age) public {
        // Add user to the mapping only if the user does not exist
        require(_users[msg.sender]._age == 0, "User already exists");
        _users[msg.sender] = User(_firstname, _lastname, _email, _age);
        _userCount++;
    }

    function modifyUser(string memory _firstname, string memory _lastname, string memory _email, uint _age) public {
        // Add user to the mapping only if the user does not exist
        require(_users[msg.sender]._age != 0, "User does not exist");
        _users[msg.sender] = User(_firstname, _lastname, _email, _age);
    }

    function getUser() public view returns (User memory) {
        return _users[msg.sender];
    }

    function getUserCount() public view returns (uint) {
        return _userCount;
    }
}