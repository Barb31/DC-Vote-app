const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  // Number of candidates in the voting process
  const numberOfCandidates = 3;

  // Deploy the Voting contract with the initial number of candidates
  deployer.deploy(Voting, numberOfCandidates);
};
