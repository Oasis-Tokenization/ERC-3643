const BN = require("ethers").BigNumber;
const { ethers, web3 } = require("hardhat");
const {
    time, 
    constants,
  } = require("@openzeppelin/test-helpers");
const ether = require("@openzeppelin/test-helpers/src/ether");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getIdAddressFromTx(tx, idFactory, walletAddress) {
  let keccakWalletLinkedEvent = ethers.id("WalletLinked(address,address)");
  //see ethers v6 filter && topicfilter 
  let event = await ethers.provider.getLogs({
    fromBlock: tx.blockNumber,
    toBlock: tx.blockNumber,
    address: idFactory,
    topics: [keccakWalletLinkedEvent, ethers.zeroPadValue(walletAddress, 32)]
  });
  return ethers.dataSlice(event[0].topics[2], 12);
}

async function main () {
    const [deployer, otaController, otaTokenAgent, investor1] = await ethers.getSigners();
    const { chainId } = await ethers.provider.getNetwork();
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
    const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD';

    const AGENTMNGR = await ethers.getContractFactory("AgentManager");
    const OWNERMANAGER = await ethers.getContractFactory("OwnerManager");
    const TIR = await ethers.getContractFactory("TrustedIssuersRegistry");
    const CTR = await ethers.getContractFactory("ClaimTopicsRegistry");
    const MC = await ethers.getContractFactory("ModularCompliance");
    const IRS = await ethers.getContractFactory("IdentityRegistryStorage");
    const IR = await ethers.getContractFactory("IdentityRegistry");
    const TOKEN = await ethers.getContractFactory("Token");
    const GATEWAY = await ethers.getContractFactory("Gateway");
    const IDENTITY = await ethers.getContractFactory("Identity");

   

    // // Uncomment and uses below code if having rpc issues with tx gas estimations and pricing // //
    // let provider = ethers.getDefaultProvider(process.env.POLYGON_URL);
    // let feeData = await provider.getFeeData();
    // console.log("infura rpc: ");
    // console.log("provider : ", provider);
    // console.log("fee data: ", feeData);
    // console.log("gas price : ", feeData.gasPrice);
    // console.log("gas price x 1.2", Math.round(Number(feeData.gasPrice) * 1.2));

    let ownerIdentity = process.env.POLYGON_OWNER_IDENTITY;
    let ownerManager = await OWNERMANAGER.attach(process.env.POLYGON_OWNER_MULTISIG);



    // gasEst = await agentManager.addSupplyModifier.estimateGas(otaControllerIdentity);
    // await agentManager.addSupplyModifier(otaControllerIdentity, {gasLimit: gasEst * BigInt(2)});
    // console.log("AgentManager: Added Supply Modifier : ", otaControllerIdentity);
    // await sleep(3000);
    // gasEst = await agentManager.addWhiteListManager.estimateGas(otaControllerIdentity);
    // await agentManager.addWhiteListManager(otaControllerIdentity, {gasLimit: gasEst * BigInt(2)});
    // console.log("AgentManager: Added WhiteList Manager: ", otaControllerIdentity);
    // await sleep(3000);
    // gasEst = await agentManager.addFreezer.estimateGas(otaControllerIdentity);
    // await agentManager.addFreezer(otaControllerIdentity, {gasLimit: gasEst * BigInt(2)});
    // console.log("AgentManager: Added Freezer: ", otaControllerIdentity);
    // await sleep(3000);
    // gasEst = await agentManager.addTransferManager.estimateGas(otaControllerIdentity);
    // await agentManager.addTransferManager(otaControllerIdentity, {gasLimit: gasEst * BigInt(2)});
    // console.log("AgentManager: Added TransferManager: ", otaControllerIdentity);
    // await sleep(3000);
    // gasEst = await agentManager.addRecoveryAgent.estimateGas(otaControllerIdentity);
    // await agentManager.addRecoveryAgent(otaControllerIdentity, {gasLimit: gasEst * BigInt(2)});
    // console.log("AgentManager: Added RecoveryAgent: ", otaControllerIdentity);
    // await sleep(3000);
    // gasEst = await agentManager.addComplianceAgent.estimateGas(otaControllerIdentity);
    // await agentManager.addComplianceAgent(otaControllerIdentity, {gasLimit: gasEst * BigInt(2)});
    // console.log("AgentManager: Added Compliance Agent: ", otaControllerIdentity);
    // await sleep(3000);

    // let ownerManager = await OWNERMANAGER.deploy(process.env.POLYGON_TEST_TOKEN);
    // await ownerManager.waitForDeployment();
    // console.log("OwnerManager addr : ", ownerManager.target, " Linked to Token : ", process.env.POLYGON_TEST_TOKEN);
    // await sleep(3000);

    gasEst = await token.transferOwnership.estimateGas(ownerManager.target);
    console.log("est gas Token.sol, transferOwnership: ", gasEst);
    // console.log("est gas price : ", feeData.gasPrice);
    let tx = await token.transferOwnership(ownerManager.target);
    await tx.wait();
    console.log("Token: ", token.target," Ownership Transferred to OwnerManager : ", ownerManager.target);
    await sleep(3000);
    gasEst = await ir.transferOwnership.estimateGas(ownerManager.target);
    feeData = await provider.getFeeData();
    console.log("est gas IdentityRegistry.sol, transferOwnership: ", gasEst);
    console.log("est gas price: ", feeData.gasPrice);
    tx = await ir.transferOwnership(ownerManager.target);
    await tx.wait();
    console.log("Identity Registry: ", ir.target ," Ownership Transferred to OwnerManager : ", ownerManager.target);
    await sleep(3000);
    gasEst = await tir.transferOwnership.estimateGas(ownerManager.target);
    console.log("est gas TrustedIssuersRegistry.sol, transferOwnership(): ", gasEst);
    tx = await tir.transferOwnership(ownerManager.target);
    await tx.wait();
    console.log("Trusted Issuers Registry: ", tir.target ," Ownership Transferred to OwnerManager : ", ownerManager.target);
    await sleep(3000);
    gasEst = await ctr.transferOwnership.estimateGas(ownerManager.target);
    console.log("est gas ClaimTopicsRegistry.sol, transferOwnership(): ", gasEst);
    tx = await ctr.transferOwnership(ownerManager.target);
    await tx.wait();
    console.log("ClaimTopicsRegistry: ", ctr.target , " Ownership Transferred to OwnerManager : ", ownerManager.target);
    await sleep(3000);
    gasEst = await mc.transferOwnership.estimateGas(ownerManager.target);
    console.log("est gas ModularCompliance.sol, transferOwnership(): ", gasEst);
    tx = await mc.transferOwnership(ownerManager.target);
    await tx.wait();
    console.log("ModularCompliance: ", mc.target , " Ownership Transferred to OwnerManager : ", ownerManager.target);

    // IMPORTANT :: execute these functions are they are mandatory once Methodic1 identity is known
    // ownerManager

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });