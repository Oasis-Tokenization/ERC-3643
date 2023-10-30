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

    const TREXFACTORY = await ethers.getContractFactory("TREXFactory");
 
    let factory = await TREXFACTORY.attach(process.env.TST_TREXFACTORY);

    let tokenDetails = {
        owner: process.env.TOKEN_OWNER,
        name: process.env.TOKEN_NAME,
        symbol: process.env.TOKEN_SYMBOL,
        decimals: process.env.TOKEN_DECIMALS,
        irs: process.env.TOKEN_IRS,
        ONCHAINID: process.env.TOKEN_IDENTITY,
        irAgents: [],
        tokenAgents: [],
        complianceModules: [],
        complianceSettings: []
    }

    let claimDetails = {
        claimTopics: [],
        issuers: [],
        issuerClaims: []
    };

    const TX = await factory.deployTREXSuite(process.env.TOKEN_SALT, tokenDetails, claimDetails);
    const RECEIPT = await TX.wait();
    const EVENT = RECEIPT.logs?.filter((x) => {
        return x.eventName == 'TREXSuiteDeployed'
    });
    let tokenAddr = EVENT[0].args._token;

    console.log("TREX TOKEN ADDR : ", tokenAddr);
    
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });