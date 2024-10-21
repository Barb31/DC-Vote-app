// truffle-config.js
module.exports = {
  networks: {
    // Configuration for the local Ganache blockchain
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard port for Ganache
      network_id: "*",       // Match any network id
    },
    // Configuration for the Rinkeby test network
    rinkeby: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC, // Your wallet's seed phrase
        `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}` // Infura URL
      ),
      network_id: 4,         // Rinkeby network ID
      gas: 5500000,          // Gas limit
      confirmations: 2,      // # of confirmations to wait between deployments
      timeoutBlocks: 200,    // # of blocks before a deployment times out
      skipDryRun: true       // Skip dry run before migrations?
    },
  },

  // Solidity compiler settings
  compilers: {
    solc: {
      version: "0.8.0",      // Specify the Solidity version
      settings: {
        optimizer: {
          enabled: true,     // Enable optimization
          runs: 200          // Set the number of optimization runs
        },
      }
    }
  },

  // Migrations directory
  migrations_directory: "./migrations",

  // Build directory for compiled contracts
  contracts_build_directory: "./build/contracts",
};
