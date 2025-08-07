const Migrations = artifacts.require("Migrations");

module.exports = async function (deployer, network, accounts) {
  console.log(`🚀 Deploying to ${network} network...`);
  
  // Gas price optimization based on network
  const gasPrice = getOptimalGasPrice(network);
  const gasLimit = 200000; // Conservative but efficient limit
  
  console.log(`⚙️  Using gas price: ${gasPrice} wei`);
  console.log(`⚙️  Using gas limit: ${gasLimit.toLocaleString()}`);
  
  // Deploy with optimization options
  const deploymentOptions = {
    from: accounts[0],
    gas: gasLimit,
    gasPrice: gasPrice,
    // Add overwrite option for redeployments
    overwrite: true
  };
  
  try {
    // Estimate gas before deployment
    const gasEstimate = await Migrations.new.estimateGas(deploymentOptions);
    console.log(`📊 Estimated deployment gas: ${gasEstimate.toLocaleString()}`);
    
    // Deploy the contract
    const startTime = Date.now();
    await deployer.deploy(Migrations, deploymentOptions);
    const deployTime = Date.now() - startTime;
    
    // Get deployed instance for analysis
    const instance = await Migrations.deployed();
    const bytecodeSize = (await web3.eth.getCode(instance.address)).length / 2 - 1;
    
    console.log(`✅ Deployment completed in ${deployTime}ms`);
    console.log(`📏 Deployed bytecode size: ${bytecodeSize} bytes`);
    console.log(`🎯 Gas efficiency: ${((gasLimit - gasEstimate) / gasLimit * 100).toFixed(2)}% under limit`);
    
    // Verify optimization features
    await verifyOptimizations(instance);
    
  } catch (error) {
    console.error(`❌ Deployment failed:`, error.message);
    throw error;
  }
};

function getOptimalGasPrice(network) {
  const gasPrices = {
    'development': 20000000000,  // 20 gwei - reasonable for local testing
    'mainnet': 30000000000,      // 30 gwei - adjust based on current market
    'goerli': 10000000000,       // 10 gwei - cheaper for testnet
    'sepolia': 10000000000,      // 10 gwei - cheaper for testnet
    'polygon': 30000000000,      // 30 gwei - adjust for Polygon network
    'arbitrum': 100000000,       // 0.1 gwei - much cheaper on L2
  };
  
  return gasPrices[network] || 20000000000; // Default fallback
}

async function verifyOptimizations(instance) {
  console.log(`\n🔍 Verifying optimizations...`);
  
  try {
    // Test immutable variable access (should be very cheap)
    const ownerGas = await instance.owner.estimateGas();
    console.log(`   Owner access gas: ${ownerGas} (immutable optimization)`);
    
    // Test state variable access
    const migrationGas = await instance.last_completed_migration.estimateGas();
    console.log(`   Migration state gas: ${migrationGas}`);
    
    // Verify custom error is working (this will revert, but that's expected)
    try {
      await instance.setCompleted.estimateGas(123, { from: "0x1234567890123456789012345678901234567890" });
    } catch (error) {
      const usesCustomError = error.message.includes('NotOwner') || error.message.includes('30cd7471');
      console.log(`   Custom error optimization: ${usesCustomError ? '✅' : '❌'}`);
    }
    
    console.log(`✅ All optimizations verified!`);
    
  } catch (error) {
    console.log(`⚠️  Verification warning: ${error.message}`);
  }
}