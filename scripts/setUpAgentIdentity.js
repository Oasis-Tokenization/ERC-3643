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

async function main () {
    const [deployer] = await ethers.getSigners();
    const { chainId } = await ethers.provider.getNetwork();
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
    const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD';

    const AGENTMNGR = await ethers.getContractFactory("AgentManager");
    const IDFACTROY = await ethers.getContractFactory("IdFactory");
    const OWNERMANAGER = await ethers.getContractFactory("OwnerManager");

    let idFactory = await IDFACTROY.attach(process.env.IDFACTORY);
    let agentManager = await AGENTMNGR.attach(process.env.AGENT_MANAGER);
    let ownerManager = await OWNERMANAGER.attach(process.env.OWNER_MANAGER);

    // //Deploy Identity for TOKEN_AGENT_MS (TOP LEVEL AGENT MS)
    // let managementKeys = [web3.utils.keccak256(web3.eth.abi.encodeParameter("address", process.env.METH_CONTROLLER))];

    // let identity = await idFactory.createIdentityWithManagementKeys(process.env.TOKEN_AGENT_MS,web3.eth.abi.encodeParameter("string", process.env.TOKEN_AGENT_MS),managementKeys);
    // console.log("Identity deployed for TOKEN_AGENT_MS : ", identity);

    await agentManager.addSupplyModifier(process.env.TOKEN_AGENT_MS_IDENTITY);
    console.log("AgentManager: Added Supply Modifier : ", process.env.TOKEN_AGENT_MS_IDENTITY);
    await sleep(3000);
    await agentManager.addWhiteListManager(process.env.TOKEN_AGENT_MS_IDENTITY);
    console.log("AgentManager: Added WhiteList Manager: ", process.env.TOKEN_AGENT_MS_IDENTITY);
    await sleep(3000);
    await agentManager.addFreezer(process.env.TOKEN_AGENT_MS_IDENTITY);
    console.log("AgentManager: Added Freezer: ", process.env.TOKEN_AGENT_MS_IDENTITY);
    await sleep(3000);
    await agentManager.addTransferManager(process.env.TOKEN_AGENT_MS_IDENTITY);
    console.log("AgentManager: Added TransferManager: ", process.env.TOKEN_AGENT_MS_IDENTITY);
    await sleep(3000);
    await agentManager.addRecoveryAgent(process.env.TOKEN_AGENT_MS_IDENTITY);
    console.log("AgentManager: Added RecoveryAgent: ", process.env.TOKEN_AGENT_MS_IDENTITY);
    await sleep(3000);
    await agentManager.addComplianceAgent(process.env.TOKEN_AGENT_MS_IDENTITY);
    console.log("AgentManager: Added Compliance Agent: ", process.env.TOKEN_AGENT_MS_IDENTITY);
    
    //TODO pass ownership of agentmanager and ownermanager to methodic controller account

    // await agentManager.removeSupplyModifier('0xc61c0a9a294e98ce2c790a7c7075666790155de2');
    // console.log("AgentManager: Removed Supply Modifier 0xc61c0a9a294e98ce2c790a7c7075666790155de2");
    // await sleep(3000);
    // await agentManager.removeWhiteListManager('0xc61c0a9a294e98ce2c790a7c7075666790155de2');
    // console.log("AgentManager: Removed Whitelist Manager 0xc61c0a9a294e98ce2c790a7c7075666790155de2");
    // await sleep(3000);
    // await agentManager.removeFreezer('0xc61c0a9a294e98ce2c790a7c7075666790155de2');
    // console.log("AgentManager: Removed Freezer 0xc61c0a9a294e98ce2c790a7c7075666790155de2");
    // await sleep(3000);
    // await agentManager.removeTransferManager('0xc61c0a9a294e98ce2c790a7c7075666790155de2');
    // console.log("AgentManager: Removed Transfer Manager 0xc61c0a9a294e98ce2c790a7c7075666790155de2");
    // await sleep(3000);
    // await agentManager.removeRecoveryAgent('0xc61c0a9a294e98ce2c790a7c7075666790155de2');
    // console.log("AgentManager: Removed Recovery Agent 0xc61c0a9a294e98ce2c790a7c7075666790155de2");
    // await sleep(3000);
    // await agentManager.removeComplianceAgent('0xc61c0a9a294e98ce2c790a7c7075666790155de2');
    // console.log("AgentManager: Removed ComplianceAgent 0xc61c0a9a294e98ce2c790a7c7075666790155de2");


}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });