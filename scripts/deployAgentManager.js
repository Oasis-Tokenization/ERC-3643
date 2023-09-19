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
    const OWNERMANAGER = await ethers.getContractFactory("OwnerManager");
    const TIR = await ethers.getContractFactory("TrustedIssuersRegistry");
    const CTR = await ethers.getContractFactory("ClaimTopicsRegistry");
    const MC = await ethers.getContractFactory("ModularCompliance");
    const IRS = await ethers.getContractFactory("IdentityRegistryStorage");
    const IR = await ethers.getContractFactory("IdentityRegistry");
    const TOKEN = await ethers.getContractFactory("Token");

    let tir = await TIR.attach(process.env.TIR);
    let ctr = await CTR.attach(process.env.CTR);
    let mc = await MC.attach(process.env.MC);
    let irs = await IRS.attach(process.env.IRS);
    let ir = await IR.attach(process.env.IR);
    let token = await TOKEN.attach(process.env.TOKEN);

    let agentManager = await AGENTMNGR.deploy(process.env.TOKEN);
    console.log("AgentManager addr: ", agentManager.target, " Linked to Token : ", process.env.TOKEN);
    await sleep(3000);


    //Add AgentManager as Agent on Identity Registry
    await ir.addAgent(agentManager.target);
    console.log("IdentityRegistry agent added : (AgentManager: ", agentManager.target, ")");
    await sleep(3000);

    //Add AgentManager as Agent on Token
    await token.addAgent(agentManager.target);
    console.log("Token agent added : (AgentManager: ", agentManager.target, ")");
    await sleep(3000);

    let ownerManager = await OWNERMANAGER.deploy(process.env.TOKEN);
    console.log("OwnerManager addr : ", ownerManager.target, " Linked to Token : ", process.env.TOKEN);
    await sleep(3000);

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