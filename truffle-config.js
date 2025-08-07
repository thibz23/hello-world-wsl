/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const infuraKey = "fj4jll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Optimized development network
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
     gas: 6721975,          // Optimized gas limit
     gasPrice: 20000000000, // 20 gwei - reasonable for development
     skipDryRun: true,      // Skip dry run for faster deployments in development
     timeoutBlocks: 200,    // Increase timeout for better reliability
     networkCheckTimeout: 10000 // 10 second network check timeout
    },
    
    // Optimized production-ready network template
    mainnet: {
     // provider: () => new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/YOUR-PROJECT-ID`),
     network_id: 1,         // Mainnet
     gas: 8000000,          // Higher gas limit for complex contracts
     gasPrice: 20000000000, // 20 gwei - adjust based on network conditions
     confirmations: 2,      // Wait for 2 confirmations
     timeoutBlocks: 200,    // Timeout after 200 blocks
     skipDryRun: false,     // Always dry run on mainnet
     networkCheckTimeout: 30000, // 30 second timeout for mainnet
     production: true       // Treats this network as production
    },

    // Optimized testnet configuration
    goerli: {
     // provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/YOUR-PROJECT-ID`),
     network_id: 5,         // Goerli testnet
     gas: 8000000,          // Higher gas limit
     gasPrice: 10000000000, // 10 gwei for testnet
     confirmations: 2,      // Wait for 2 confirmations
     timeoutBlocks: 200,    // Timeout configuration
     skipDryRun: true,      // Skip dry run on testnet for faster deployment
     networkCheckTimeout: 30000
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    timeout: 60000,    // Increase timeout for complex tests
    reporter: 'spec',  // Use spec reporter for clear output
    slow: 1000,        // Mark tests as slow if they take more than 1s
    bail: false,       // Don't stop on first failure
    recursive: true,   // Search for tests recursively
    parallel: false    // Disable parallel for deterministic results
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.19",    // Use a more recent, optimized version of Solidity
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,     // Enable optimization for gas efficiency
         runs: 1000        // Optimize for frequent function calls (higher runs = more optimization)
       },
       evmVersion: "london"  // Use London EVM version for better gas efficiency
      }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
  //
  // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
  // those previously migrated contracts available in the .db directory, you will need to run the following:
  // $ truffle migrate --reset --compile-all

  db: {
    enabled: false
  }
};
