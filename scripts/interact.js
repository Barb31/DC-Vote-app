const Web3 = require("web3");
const compiledVoting = require("../build/contracts/Voting.json");

const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID");
const web3 = new Web3(provider);

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Deployed contract address
const voting = new web3.eth.Contract(compiledVoting.abi, contractAddress);

const interact = async () => {
  const accounts = await web3.eth.getAccounts();

  // Register a voter
  console.log("Registering voter from account:", accounts[0]);
  await voting.methods.registerVoter(accounts[0]).send({ from: accounts[0] });

  // Vote for a candidate
  console.log("Voting for candidate 1...");
  await voting.methods.vote(1).send({ from: accounts[0] });

  // Check results
  const result = await voting.methods.getResults(1).call();
  console.log("Candidate 1 has:", result, "votes");
};

interact();
