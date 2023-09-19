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
    const TREXFACTORY = await ethers.getContractFactory("TREXFactory");
    const TREXIMPLAUTH = await ethers.getContractFactory("TREXImplementationAuthority");

    let idFactory = await IDFACTROY.attach(process.env.IDFACTORY);
    let agentManager = await AGENTMNGR.attach(process.env.AGENT_MANAGER);
    let ownerManager = await OWNERMANAGER.attach(process.env.OWNER_MANAGER);

    await ownerManager.transferOwnership(process.env.METH_CONTROLLER);
    await agentManager.transferOwnership(process.env.METH_CONTROLLER);

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });