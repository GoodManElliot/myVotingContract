var Migrations = artifacts.require("../contract/Migrations.sol");
var voting = artifacts.require("../contract/Voting.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(voting,["rama", "nick", "bob"]);
};
