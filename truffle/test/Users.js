const Users = artifacts.require("Users");

contract("Users", (accounts) => {
    it("Should add a user to the mapping", async () => {
        const usersInstance = await Users.deployed();
        assert.equal((await usersInstance.getUserCount.call()).toNumber(), 0);
        await usersInstance.addUser("Firstname", "Lastname", "test@email.com", 1, { from : accounts[0] });
        assert.equal((await usersInstance.getUserCount.call()).toNumber(), 1);
    });
    it("Should return a user with the address of the first account", async () => {
        const usersInstance = await Users.deployed();
        const result = await usersInstance.getUser.call(accounts[0], { from : accounts[0] });
        assert.equal(result._firstname, "Firstname");
        assert.equal(result._lastname, "Lastname");
        assert.equal(result._email, "test@email.com");
        assert.equal(result._age, 1);
    });
    it("Should modify user information in the mapping", async () => {
        const usersInstance = await Users.deployed();
        assert.equal((await usersInstance.getUserCount.call()).toNumber(), 1);
        await usersInstance.modifyUser("Clément", "Rault", "clement@email.com", 22, { from : accounts[0] });
        assert.equal((await usersInstance.getUserCount.call()).toNumber(), 1);
        const result = await usersInstance.getUser.call(accounts[0], { from : accounts[0] });
        assert.equal(result._firstname, "Clément");
        assert.equal(result._lastname, "Rault");
        assert.equal(result._email, "clement@email.com");
        assert.equal(result._age, 22);
    });
    it("Should delete a user from the mapping", async () => {
        const usersInstance = await Users.deployed();
        assert.equal((await usersInstance.getUserCount.call()).toNumber(), 1);
        await usersInstance.deleteUser({ from : accounts[0] });
        assert.equal((await usersInstance.getUserCount.call()).toNumber(), 0);
    });
});