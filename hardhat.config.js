// hardhat.config.js
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    version: "0.8.0", // Specify the Solidity version
    settings: {
      optimizer: {
        enabled: true, // Enable optimization
        runs: 200,     // Set the number of optimization runs
      },
    },
  },
  networks: {
    // Local Hardhat blockchain settings
    hardhat: {
      chainId: 1337, // Local chain ID
    },
    // Configuration for the Rinkeby test network
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Your wallet's private key
    },
  },
  paths: {
    sources: "./contracts",   // Path to Solidity contracts
    tests: "./test",          // Path to test scripts
    cache: "./cache",         // Path to cache directory
    artifacts: "./artifacts"  // Path to artifacts (compiled contracts)
  },
};
