// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Users {

    struct User {
        address _address;
        string _firstname;
        string _lastname;
        string _email;
        uint _age;
    }

    mapping(address => User) _users;    

    function addUser(address _user, string memory _firstname, string memory _lastname, string memory _email, uint _age) public {
        // Add the user only if it doesn't exist
        require(_users[_user]._address != _user, "User already exists.");
        _users[msg.sender] = User(_user, _firstname, _lastname, _email, _age);
    }

    function getUser(address _address) public view returns (User memory) {
        // Seul l'utilisateur peut voir ses informations
        require(_users[msg.sender]._address == msg.sender , "You are not allowed.");
        return _users[_address];
    }

}