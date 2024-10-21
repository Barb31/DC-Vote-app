const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
  let votingInstance;

  beforeEach(async () => {
    votingInstance = await Voting.new(3); // Deploy contract with 3 candidates
  });

  it("should register a voter", async () => {
    await votingInstance.registerVoter(accounts[1], { from: accounts[0] });
    const voter = await votingInstance.voters(accounts[1]);
    assert.equal(voter.voted, false, "Voter should be registered but not have voted yet");
  });

  it("should not allow non-owner to register a voter", async () => {
    try {
      await votingInstance.registerVoter(accounts[1], { from: accounts[1] });
      assert.fail("Non-owner was able to register a voter");
    } catch (error) {
      assert(error.message.includes("Not the owner"), "Error should contain 'Not the owner'");
    }
  });

  it("should allow a voter to vote", async () => {
    await votingInstance.registerVoter(accounts[1], { from: accounts[0] });
    await votingInstance.vote(1, { from: accounts[1] });
    const voter = await votingInstance.voters(accounts[1]);
    assert.equal(voter.voted, true, "Voter should have voted");
    const candidateVotes = await votingInstance.getResults(1);
    assert.equal(candidateVotes.toNumber(), 1, "Candidate 1 should have 1 vote");
  });

  it("should not allow a voter to vote twice", async () => {
    await votingInstance.registerVoter(accounts[1], { from: accounts[0] });
    await votingInstance.vote(1, { from: accounts[1] });
    try {
      await votingInstance.vote(1, { from: accounts[1] });
      assert.fail("Voter was able to vote twice");
    } catch (error) {
      assert(error.message.includes("Already voted"), "Error should contain 'Already voted'");
    }
  });

  it("should not allow voting for an invalid candidate", async () => {
    await votingInstance.registerVoter(accounts[1], { from: accounts[0] });
    try {
      await votingInstance.vote(4, { from: accounts[1] }); // Invalid candidate number
      assert.fail("Voter was able to vote for an invalid candidate");
    } catch (error) {
      assert(error.message.includes("Invalid candidate"), "Error should contain 'Invalid candidate'");
    }
  });

  it("should correctly count votes for each candidate", async () => {
    await votingInstance.registerVoter(accounts[1], { from: accounts[0] });
    await votingInstance.registerVoter(accounts[2], { from: accounts[0] });
    await votingInstance.vote(1, { from: accounts[1] });
    await votingInstance.vote(1, { from: accounts[2] });
    const candidateVotes = await votingInstance.getResults(1);
    assert.equal(candidateVotes.toNumber(), 2, "Candidate 1 should have 2 votes");
  });
});
