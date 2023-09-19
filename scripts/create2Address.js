const BN = require("ethers").BigNumber;
const { ethers, web3 } = require("hardhat");
const ether = require("@openzeppelin/test-helpers/src/ether");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main () {
    const [deployer] = await ethers.getSigners();
    const { chainId } = await ethers.provider.getNetwork();
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
    const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD';

    const TIRPROXY = await ethers.getContractFactory("TrustedIssuersRegistryProxy");
    const CTRPROXY = await ethers.getContractFactory("ClaimTopicsRegistryProxy");
    const MCPROXY = await ethers.getContractFactory("ModularComplianceProxy");
    const IRSPROXY = await ethers.getContractFactory("IdentityRegistryStorageProxy");
    const IRPROXY = await ethers.getContractFactory("IdentityRegistryProxy");
    const TOKENPROXY = await ethers.getContractFactory("TokenProxy");
    
    let from = process.env.FROM;
    let salt =  process.env.SALT;
    let implAuthAddr = process.env.IMPLADDR;

    let tirProxyAddress = await ethers.getCreate2Address(from, ethers.id(salt), ethers.solidityPackedKeccak256(["bytes", "bytes"], [TIRPROXY.bytecode, web3.eth.abi.encodeParameter("address", implAuthAddr)]));
    console.log("TIR PROXY PREDETERMINED : ", tirProxyAddress);
    
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });