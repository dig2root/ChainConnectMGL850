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

    function addUser(address _user, string memory _firstname, string memory _lastname, string memory _email, uint _age) public {
        _users[_user] = User(_firstname, _lastname, _email, _age);
        _userCount++;
    }

    function getUser(address _user) public view returns (User memory) {
        return _users[_user];
    }
}