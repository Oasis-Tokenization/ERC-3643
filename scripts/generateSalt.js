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


    console.log("key: ", ethers.solidityPacked(['string','string'],["0x3E52bc72FC9c00B1981E82605911170F24dCb892","Methodic CoinDesk ETH Staking (Delaware) Fund"]));
    
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });