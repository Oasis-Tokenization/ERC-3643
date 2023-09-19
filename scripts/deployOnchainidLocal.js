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
    const [deployer, investor] = await ethers.getSigners();
    const { chainId } = await ethers.provider.getNetwork();
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
    const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD';

    const IMPLAUTH = await ethers.getContractFactory("ImplementationAuthority");
    const IDFACTORY = await ethers.getContractFactory("IdFactory");
    const GATEWAY = await ethers.getContractFactory("Gateway");
    const IDENTITY = await ethers.getContractFactory("Identity");
    const CLAIMISSUER = await ethers.getContractFactory("ClaimIssuer");

    // deploy identity implementation and implementation authority, link implementation
    let idImpl = await IDENTITY.deploy(DEAD_ADDRESS, true);
    console.log("Identity Implementation : ", idImpl.target);
    let implAuth = await IMPLAUTH.deploy(idImpl.target);
    console.log("ImplementationAuthority (linked to Identity): ", implAuth.target);

    //deploy IDFactory
    let idFactory = await IDFACTORY.deploy(implAuth.target);
    console.log("IdFactory : ", idFactory.target);

    //deploy gateway
    let signersToApprove = [deployer.address];
    let gateway = await GATEWAY.deploy(idFactory.target, signersToApprove);
    console.log("gateway deployed : ", gateway.target);

    //set gateway as owner on id factory
    await idFactory.transferOwnership(gateway.target);
    console.log("IdFactory ownership transferred to gateway");
    
    //deploy identity on behalf of investor
    
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });