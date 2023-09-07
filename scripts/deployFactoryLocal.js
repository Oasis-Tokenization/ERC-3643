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

    const IMPLAUTH = await ethers.getContractFactory("TREXImplementationAuthority");
    const IAFACTORY = await ethers.getContractFactory("IAFactory");
    const TREXFACTORY = await ethers.getContractFactory("TREXFactory");
    const TOKENIMPL = await ethers.getContractFactory("Token");
    const CTR = await ethers.getContractFactory("ClaimTopicsRegistry");
    const IR = await ethers.getContractFactory("IdentityRegistry");
    const IRS = await ethers.getContractFactory("IdentityRegistryStorage");
    const TIR = await ethers.getContractFactory("TrustedIssuersRegistry");
    const COMPLIANCE = await ethers.getContractFactory("ModularCompliance");

    //deploy TREXCONTRACTS see ITREXImplementationAuthority.sol interface for implementation struct details
    let tir = await TIR.deploy();
    console.log("TIR: ", tir.target);
    
    await tir.init();
    console.log("TIR impl initialized");
    
    
    let ctr = await CTR.deploy();
    console.log("CTR: ", ctr.target);
    
    await ctr.init();
    console.log("CTR impl initialized");
    

    let irs = await IRS.deploy();
    console.log("IRS: ", irs.target);
    
    await irs.init();
    console.log("IRS impl initialized");
    

    let ir = await IR.deploy();
    console.log("IR: ", ir.target);
    
    await ir.init(tir.target, ctr.target, irs.target);
    console.log("IR impl initialized");
    

    let compliance = await COMPLIANCE.deploy();
    console.log("Compliance: ", compliance.target);
    
    await compliance.init();
    console.log("Compliance impl initialized");
    

    let token = await TOKENIMPL.deploy();
    console.log("Token Implementation: ", token.target);
    
    await token.init(ir.target, compliance.target, "dead", "dead", 18, ZERO_ADDRESS);
    console.log("Token impl initialized");
    

    //TREXContracts
    let TREXcontracts = {
        tokenImplementation: token.target,
        ctrImplementation: ctr.target,
        irImplementation: ir.target,
        irsImplementation: irs.target,
        tirImplementation: tir.target,
        mcImplementation: compliance.target
    }

    //TREXVersion
    let TREXversion = {
        major: 4,
        minor: 0,
        patch: 1
    }

    //deploy implementation authority
    let implementationAuth = await IMPLAUTH.deploy(true, ZERO_ADDRESS, ZERO_ADDRESS);
    
    console.log("Reference Impl Auth : ", implementationAuth.target);
    await implementationAuth.addAndUseTREXVersion(TREXversion, TREXcontracts);
    console.log("addAndUseTREXVersion success", );
    

    // deploy and set up TREX Token Factory
    let trexFactory = await TREXFACTORY.deploy (implementationAuth.target);
    console.log("TREX Factory: ", trexFactory.target);
    

    // deploy IAFactory
    let iaFactory = await IAFACTORY.deploy(trexFactory.target);
    console.log("IAFactory :", iaFactory.target);
    

    //set up implementation authority
    await implementationAuth.setTREXFactory(trexFactory.target);
    console.log("IAFactory: setTREXFactory success");
    
    await implementationAuth.setIAFactory(iaFactory.target);
    console.log("IAFactory: setIAFactory success");
    

    //deploy test token (for local testing on hardhat network)

    let irAgents = [];
    let tokenAgents = [];
    let complianceModules = [];
    let complianceSettings = [];

    let tokenDetails = {
      owner: deployer.address,
      name: "OTATEST",
      symbol: "OTAT",
      decimals: 18,
      irs: ZERO_ADDRESS,
      ONCHAINID: ZERO_ADDRESS,
      irAgents,
      tokenAgents,
      complianceModules,
      complianceSettings
    }

    let claimTopics = [];
    let issuers = [];
    let issuerClaims = [];
    let claimDetails = {
      claimTopics,
      issuers,
      issuerClaims
    }

    console.log("tokenDetails: ", tokenDetails);
    console.log("claimDetails : ", claimDetails);
    let salt = "randomsalt";

    let tokenTx = await trexFactory.deployTREXSuite(salt, tokenDetails, claimDetails);
    // let logsFrom = await trexFactory.queryFilter(filterFrom, -10, "latest");
    // console.log("logs from: ", logsFrom[0].args);
    let tokenReceipt = await tokenTx.wait();
    let factoryLog = tokenReceipt.logs?.filter((x)=> {return x.address == trexFactory.target});
    // let event = factoryLog.
    // console.log("Token deployed : ", tokenReceipt.logs);
    console.log("Token event : ", event);
    // console.log("events : ", event);
    // console.log("Token Deployed - address: ", event[0].args._token);

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });