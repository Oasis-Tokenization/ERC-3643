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
    const IDENTITY = await ethers.getContractFactory("Identity");

    let identity = await IDENTITY.attach("0x54497d92e9f0e17574fe658c421952d1de861fcb");
    console.log("identity, ", await identity.keyHasPurpose("0x1957cc27c094853f42ef50caad6bc171d8d9ef280633bf6396cf03375218d35e", 2));
    
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });