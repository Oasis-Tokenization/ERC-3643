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
    const IR = await ethers.getContractFactory("IdentityRegistry");

    let ir = await IR.attach("0x61888506fbedbbbc0b6cb439eee61be0250467b7");
    console.log("is verified? : ", await ir.isVerified("0xCDCE9f5A7a4ef77a42197ec1b11C69CC64b54a79"));
    
    
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });