var SolidityContract = artifacts.require('Users');

module.exports = function(deployer) {
  deployer.deploy(SolidityContract);
};