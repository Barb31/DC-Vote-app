# DC-Vote-app
# Decentralized Voting
## Overview
Decentralized Voting is a blockchain-based voting application that enables users to vote anonymously and transparently. The system ensures that each user's vote is encrypted and recorded on the blockchain, making it immutable and resistant to tampering.

## Features
* **User Registration:** Each user registers through a smart contract and receives a unique identifier.
* **Voting Process:** Users can vote only once. After voting, the vote is recorded on the blockchain.
* **Vote Counting:** Once voting ends, the smart contract automatically counts the votes and displays the result.
* **Transparency:** All voting results are available for public viewing on the blockchain without disclosing who voted for whom.
## Technologies Used
1. **Frontend:**
* React.js for the user interface.
* Web3.js for interacting with the blockchain.
* MetaMask for user authentication via a crypto wallet.
2. **Backend:**
* Solidity for writing smart contracts.
* Ethereum for the blockchain platform.
3. **Development Tools:**
* Truffle or Hardhat for testing and deploying smart contracts.
* Ganache for local blockchain deployment.

## Project Structure
```
/voting-app
│
├── /client
│   ├── /public
│   ├── /src
│   │   ├── /components
│   │   ├── App.js
│   │   ├── web3.js
│   │   ├── VotingContract.js
│   │   └── index.js
│   └── package.json
│
├── /contracts
│   ├── Voting.sol
│   └── Migrations.sol
│
├── /migrations
│   ├── 1_initial_migration.js
│   └── 2_deploy_voting.js
│
├── /scripts
│   ├── interact.js
│   └── deploy.js
│
├── /test
│   ├── Voting.test.js
│   └── Migrations.test.js
│
├── /backend
│   ├── server.js
│   └── package.json
│
├── /build
│   ├── contracts
│
├── truffle-config.js
├── hardhat.config.js
├── README.md
└── .gitignore
```
## Getting Started
**Prerequisites** 
* Node.js
* MetaMask
* Truffle or Hardhat
* Ganache (for local development)

## Installation
1. **Clone the repository:**
```
git clone https://github.com/yourusername/voting-app.git
cd voting-app
```
2. **Install dependencies for the client:**

```
cd client
npm install
```
3. **Install dependencies for smart contract deployment:**
```
cd client
npm install
```
## Setting Up the Blockchain
1. **Start a local blockchain with Ganache. Open Ganache and create a new workspace** 
2. **Compile and migrate the smart contracts**
```
truffle compile
truffle migrate --network development
```
Or, if using Hardhat:
```
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```
3. **Connect MetaMask to your local blockchain:**

* Open MetaMask and switch to a custom RPC network.
* Use `http://127.0.0.1:7545` for the RPC URL and `1337` as the Chain ID (if using Ganache).

 ## Running the Application
1. **Start the client:**
 ```
   cd client
npm start
```
This will start the React application and open it in your default web browser.

2. **Interact with the voting app:**  Register, cast a vote, and view the results through the user interface.

## Running Tests
To run the tests for the smart contract:

```
truffle test
```
Or with Hardhat:
```
npx hardhat test
```
## Smart Contract
Here’s a simplified version of the `Voting.sol` contract:
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Voter {
        bool voted;
        uint vote;
    }

    mapping(address => Voter) public voters;
    mapping(uint => uint) public votesCount;
    address public owner;
    uint public candidates;

    constructor(uint _candidates) {
        owner = msg.sender;
        candidates = _candidates;
    }

    function registerVoter(address _voter) public {
        require(!voters[_voter].voted, "Voter has already voted");
        voters[_voter] = Voter(false, 0);
    }

    function vote(uint _candidate) public {
        require(!voters[msg.sender].voted, "Already voted");
        require(_candidate < candidates, "Invalid candidate");

        voters[msg.sender].voted = true;
        voters[msg.sender].vote = _candidate;
        votesCount[_candidate]++;
    }

    function getResults(uint _candidate) public view returns (uint) {
        require(_candidate < candidates, "Invalid candidate");
        return votesCount[_candidate];
    }
}
```

