import React, { useState } from "react";
import VotingContract from "../VotingContract";
import web3 from "../web3";

const VoterRegistration = () => {
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const registerVoter = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    setMessage("Registering voter...");

    try {
      await VotingContract.methods.registerVoter(address).send({
        from: accounts[0],
      });
      setMessage("Voter successfully registered!");
    } catch (error) {
      setMessage("Error registering voter: " + error.message);
    }
  };

  return (
    <div>
      <h2>Register as a Voter</h2>
      <form onSubmit={registerVoter}>
        <input
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="Enter Ethereum address"
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default VoterRegistration;
