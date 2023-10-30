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

    let tir = await TIR.attach(process.env.TST_TIR);
    let ctr = await CTR.attach(process.env.TST_CTR);
    let mc = await MC.attach(process.env.TST_MC);
    let irs = await IRS.attach(process.env.TST_IRS); //owned by TREXFACTORY
    let ir = await IR.attach(process.env.TST_IR);
    let token = await TOKEN.attach(process.env.TST_TOKEN);
    let gateway = await GATEWAY.attach(process.env.TST_GATEWAY);

    // let agentManager = await AGENTMNGR.attach("0xCF04c76eC572F4Ea66f99B95D706297ed1aD3738");

    let agentManager = await AGENTMNGR.deploy(process.env.TST_TOKEN);
    console.log("AgentManager addr: ", agentManager.target, " Linked to Token : ", process.env.TST_TOKEN);
    await sleep(3000);

    //Add AgentManager as Agent on Identity Registry
    await ir.addAgent(agentManager.target);
    console.log("IdentityRegistry agent added (on identity registry contract): (AgentManager: ", agentManager.target, ")");
    await sleep(3000);

    //Add AgentManager as Agent on Token
    await token.addAgent(agentManager.target);
    console.log("Token agent added (on token contract): (AgentManager: ", agentManager.target, ")");
    await sleep(3000);

    await agentManager.addSupplyModifier(process.env.TST_OTACONTROLLER_IDENTITY);
    console.log("AgentManager: Added Supply Modifier : ", process.env.TST_OTACONTROLLER_IDENTITY);
    await sleep(3000);
    await agentManager.addWhiteListManager(process.env.TST_OTACONTROLLER_IDENTITY);
    console.log("AgentManager: Added WhiteList Manager: ", process.env.TST_OTACONTROLLER_IDENTITY);
    await sleep(3000);
    await agentManager.addFreezer(process.env.TST_OTACONTROLLER_IDENTITY);
    console.log("AgentManager: Added Freezer: ", process.env.TST_OTACONTROLLER_IDENTITY);
    await sleep(3000);
    await agentManager.addTransferManager(process.env.TST_OTACONTROLLER_IDENTITY);
    console.log("AgentManager: Added TransferManager: ", process.env.TST_OTACONTROLLER_IDENTITY);
    await sleep(3000);
    await agentManager.addRecoveryAgent(process.env.TST_OTACONTROLLER_IDENTITY);
    console.log("AgentManager: Added RecoveryAgent: ", process.env.TST_OTACONTROLLER_IDENTITY);
    await sleep(3000);
    await agentManager.addComplianceAgent(process.env.TST_OTACONTROLLER_IDENTITY);
    console.log("AgentManager: Added Compliance Agent: ", process.env.TST_OTACONTROLLER_IDENTITY);

    let ownerManager = await OWNERMANAGER.deploy(process.env.TST_TOKEN);
    console.log("OwnerManager addr : ", ownerManager.target, " Linked to Token : ", process.env.TST_TOKEN);
    await sleep(3000);

    // let ownerManager = await OWNERMANAGER.attach(process.env.TST_OWNERMANAGER);

    await token.transferOwnership(ownerManager.target);
    console.log("Token: ", token.target," Ownership Transferred to OwnerManager : ", ownerManager.target);
    await sleep(3000);
    await ir.transferOwnership(ownerManager.target);
    console.log("Identity Registry: ", ir.target ," Ownership Transferred to OwnerManager : ", ownerManager.target);
    await sleep(3000);
    await tir.transferOwnership(ownerManager.target);
    console.log("Trusted Issuers Registry: ", tir.target ," Ownership Transferred to OwnerManager : ", ownerManager.target);
    await sleep(3000);
    await ctr.transferOwnership(ownerManager.target);
    console.log("ClaimTopicsRegistry: ", ctr.target , " Ownership Transferred to OwnerManager : ", ownerManager.target);
    await sleep(3000);
    await mc.transferOwnership(ownerManager.target);
    console.log("ModularCompliance: ", mc.target , " Ownership Transferred to OwnerManager : ", ownerManager.target);


}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });