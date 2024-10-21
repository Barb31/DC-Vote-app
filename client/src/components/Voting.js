import React, { useState } from "react";
import VotingContract from "../VotingContract";
import web3 from "../web3";

const Voting = () => {
  const [candidate, setCandidate] = useState("");
  const [message, setMessage] = useState("");

  const onVote = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    setMessage("Processing your vote...");

    try {
      await VotingContract.methods.vote(candidate).send({ from: accounts[0] });
      setMessage("Vote successfully submitted!");
    } catch (error) {
      setMessage("Error submitting vote: " + error.message);
    }
  };

  return (
    <div>
      <h2>Vote for your Candidate</h2>
      <form onSubmit={onVote}>
        <input
          value={candidate}
          onChange={(event) => setCandidate(event.target.value)}
          placeholder="Enter candidate number"
        />
        <button type="submit">Vote</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Voting;
