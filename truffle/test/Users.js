const Users = artifacts.require("Users");

contract("Users", (accounts) => {
    it("Should add a user to the mapping", async () => {
        const usersInstance = await Users.deployed();
        const result = await usersInstance.addUser.call(accounts[0], "Firstname", "Lastname", "test@email.com", 1, { from : accounts[0] });
        console.log(result);
        assert.equal(result._firstname, "Firstname");
        assert.equal(result._lastname, "Lastname");
        assert.equal(result._email, "test@email.com");
        assert.equal(result._age, 1);
    });
    it("Should get user data from the mapping", async () => {
        const usersInstance = await Users.deployed();
        const result = await usersInstance.getUser.call(accounts[0], { from : accounts[0] });
        console.log(result);
        assert.equal(result._firstname, "Firstname");
        assert.equal(result._lastname, "Lastname");
        assert.equal(result._email, "test@email.com");
        assert.equal(result._age, 1);
    });
});