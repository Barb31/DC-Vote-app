// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    // Mapping to store the votes for each candidate
    mapping(uint256 => uint256) public votesReceived;

    // Mapping to track whether an address has already voted
    mapping(address => bool) public voters;

    // Array to keep track of all candidates
    uint256[] public candidateList;

    // Event to emit when a vote is cast
    event Voted(uint256 indexed candidate, address indexed voter);

    // Constructor to initialize the candidates
    constructor(uint256[] memory candidateNumbers) {
        candidateList = candidateNumbers;
    }

    // Function to vote for a candidate
    function vote(uint256 candidate) public {
        require(validCandidate(candidate), "Invalid candidate");
        require(!voters[msg.sender], "Already voted");

        votesReceived[candidate] += 1;
        voters[msg.sender] = true;

        emit Voted(candidate, msg.sender);
    }

    // Function to get the total votes for a candidate
    function getTotalVotes(uint256 candidate) public view returns (uint256) {
        require(validCandidate(candidate), "Invalid candidate");
        return votesReceived[candidate];
    }

    // Function to verify if the candidate exists
    function validCandidate(uint256 candidate) public view returns (bool) {
        for (uint256 i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
}
