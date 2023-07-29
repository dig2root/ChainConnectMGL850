var SolidityContract = artifacts.require('Counter');

module.exports = function(deployer) {
  deployer.deploy(SolidityContract);
};