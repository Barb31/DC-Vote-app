const express = require("express");
const Web3 = require("web3");
const compiledVoting = require("../build/contracts/Voting.json");
const app = express();
const port = 3000;

const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID");
const web3 = new Web3(provider);

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address
const voting = new web3.eth.Contract(compiledVoting.abi, contractAddress);

// Middleware to parse JSON bodies
app.use(express.json());

// API route to register a voter
app.post("/register", async (req, res) => {
  const { voterAddress } = req.body;
  const accounts = await web3.eth.getAccounts();

  try {
    await voting.methods.registerVoter(voterAddress).send({ from: accounts[0] });
    res.status(200).send({ message: "Voter successfully registered" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// API route to vote
app.post("/vote", async (req, res) => {
  const { voterAddress, candidate } = req.body;
  const accounts = await web3.eth.getAccounts();

  try {
    await voting.methods.vote(candidate).send({ from: voterAddress });
    res.status(200).send({ message: "Vote successfully cast" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// API route to get results
app.get("/results/:candidate", async (req, res) => {
  const candidate = req.params.candidate;

  try {
    const result = await voting.methods.getResults(candidate).call();
    res.status(200).send({ votes: result });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
