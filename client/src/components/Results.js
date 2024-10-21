import React, { useState, useEffect } from "react";
import VotingContract from "../VotingContract";

const Results = () => {
  const [results, setResults] = useState([]);
  const [candidateNumber, setCandidateNumber] = useState(0);
  const [message, setMessage] = useState("");

  const getResults = async (event) => {
    event.preventDefault();

    try {
      const result = await VotingContract.methods.getResults(candidateNumber).call();
      setResults((prevResults) => [...prevResults, { candidate: candidateNumber, votes: result }]);
      setMessage("");
    } catch (error) {
      setMessage("Error fetching results: " + error.message);
    }
  };

  return (
    <div>
      <h2>Election Results</h2>
      <form onSubmit={getResults}>
        <input
          value={candidateNumber}
          onChange={(event) => setCandidateNumber(event.target.value)}
          placeholder="Enter candidate number"
        />
        <button type="submit">Get Results</button>
      </form>
      <p>{message}</p>
      <ul>
        {results.map((result, index) => (
          <li key={index}>Candidate {result.candidate}: {result.votes} votes</li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
