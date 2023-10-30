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
    const [deployer, otaController, otaTokenAgent, investor1] = await ethers.getSigners();
    const { chainId } = await ethers.provider.getNetwork();
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
    const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD';

    const IDFACTORY = await ethers.getContractFactory("IdFactory");
    const GATEWAY = await ethers.getContractFactory("Gateway");
    const IDENTITY = await ethers.getContractFactory("Identity");

    const idFactoryAddr = "0xE496e8A2830EBa93a5Fdc72E271e637d280b7c9B";

    let signersToApprove = [];
    let gateway = await GATEWAY.deploy(idFactoryAddr, signersToApprove);
    console.log("gateway deployed for : ", idFactoryAddr, "address : ", gateway.target);

    // transfer ownership of idFactory to Gateway
    let idFactory = await IDFACTORY.attach(idFactoryAddr);
    await idFactory.transferOwnership(gateway.target);
    console.log("IdFactory: ", idFactoryAddr, " ownership transferred to gateway at : ", gateway.target);

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });