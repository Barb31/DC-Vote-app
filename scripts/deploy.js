const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const compiledVoting = require("../build/contracts/Voting.json");

// Configure the provider with your wallet's mnemonic and Infura (or other) network endpoint
const provider = new HDWalletProvider(
  "your wallet mnemonic here",
  "https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Deploying contract from account:", accounts[0]);

  const result = await new web3.eth.Contract(compiledVoting.abi)
    .deploy({ data: compiledVoting.bytecode, arguments: [3] }) // 3 is the number of candidates
    .send({ from: accounts[0], gas: "2000000" });

  console.log("Contract deployed to:", result.options.address);
  provider.engine.stop();
};

deploy();
