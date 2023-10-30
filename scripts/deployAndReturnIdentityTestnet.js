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

    const DEPLOYIDTX = await gateway.deployIdentityForWallet('0x1D5f14250B767728DB006993834e167c6bA740Fa');
    await sleep(3000);
    let otaControllerIdentityAddr = await getIdAddressFromTx(DEPLOYIDTX, process.env.TST_IDFACTORY, '0x1D5f14250B767728DB006993834e167c6bA740Fa');
    console.log("OTA CONTROLLER Identity ADDRESS : ", otaControllerIdentityAddr);

    /////////////////------------------------------ATTENTION
    //This is a manual process!!! THIS NEEDS TO BE REMOVED FOR PROD, once identity is deployed for OTAController, OTAController should log on to the multisig and do a manual "addKey" execution for the OTATokenAgent Multisig
    // let otaControllerIdentity = await IDENTITY.attach(otaControllerIdentityAddr);
    // let otaSafe2Key = ethers.keccak256(ethers.AbiCoder.defaultAbiCoder().encode(["address"], [process.env.LOCAL_OTAAGENT]));
    // await otaControllerIdentity.connect(otaController).addKey(otaSafe2Key, 2, 1);
    // console.log("OTA CONTROLLER IDENTITY ADDED KEY : (OTATOKENAGENT) ", otaSafe2Key);
    /////////////////------------------------------ATTENTION



    


}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });