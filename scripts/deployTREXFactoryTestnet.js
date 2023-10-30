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

    // deploy TREXCONTRACTS see ITREXImplementationAuthority.sol interface for implementation struct details
    // let tir = await TIR.deploy();
    // console.log("TIR: ", tir.target);
    // await sleep(3000);
    // await tir.init();
    // console.log("TIR impl initialized");
    // await sleep(3000);
    
    // let ctr = await CTR.deploy();
    // console.log("CTR: ", ctr.target);
    // await sleep(3000);
    // await ctr.init();
    // console.log("CTR impl initialized");
    // await sleep(3000);

    // let irs = await IRS.deploy();
    // console.log("IRS: ", irs.target);
    // await sleep(3000);
    // await irs.init();
    // console.log("IRS impl initialized");
    // await sleep(3000);

    // let ir = await IR.deploy();
    // console.log("IR: ", ir.target);
    // await sleep(3000);
    // await ir.init(tir.target, ctr.target, irs.target);
    // console.log("IR impl initialized");
    // await sleep(3000);

    // let compliance = await COMPLIANCE.deploy();
    // console.log("Compliance: ", compliance.target);
    // await sleep(3000);
    // await compliance.init();
    // console.log("Compliance impl initialized");
    // await sleep(3000);

    // let token = await TOKENIMPL.deploy();
    // console.log("Token Implementation: ", token.target);
    // await sleep(3000);
    // await token.init(ir.target, compliance.target, "dead", "dead", 18, ZERO_ADDRESS);
    // console.log("Token impl initialized");
    // await sleep(3000);

    // //TREXContracts
    let TREXcontracts = {
      tokenImplementation: '0x5c39a009916ddFEa4171cA14730E2AEa668eC28c',
      ctrImplementation: '0x08DB28846B5bb28380D4581Bc2B1260B601865ff',
      irImplementation: '0x0D85e8E1d9aD7645Bb41D624B8599D611BB580cD',
      irsImplementation: '0x84C39Cb79d1b238196e5CA5B82Ee2bD30366338B',
      tirImplementation: '0x7826a607B1abA92EE3E794ff0904eC18C0C930f2',
      mcImplementation: '0xb06ab3031Ba367F6967253375dCa4B8bb1203AAA'
    }

    //TREXVersion
    let TREXversion = {
        major: 4,
        minor: 0,
        patch: 1
    }

    //deploy implementation authority
    // let implementationAuth = await IMPLAUTH.deploy(true, ZERO_ADDRESS, ZERO_ADDRESS);
    // await sleep(3000);

    //temp fix
    // let implementationAuth = await IMPLAUTH.attach('0x31d752d0689C3106C4f0cfD384d960dc24a56C72')

    // console.log("Reference Impl Auth : ", implementationAuth.target);
    // await implementationAuth.addAndUseTREXVersion(TREXversion, TREXcontracts);
    // console.log("addAndUseTREXVersion success", );
    // await sleep(3000);

    // deploy and set up TREX Token Factory
    let trexFactory = await TREXFACTORY.deploy('0x31d752d0689C3106C4f0cfD384d960dc24a56C72');
    console.log("TREX Factory: ", trexFactory.target);
    await sleep(3000);

    // deploy IAFactory
    let iaFactory = await IAFACTORY.deploy(trexFactory.target);
    console.log("IAFactory :", iaFactory.target);
    await sleep(3000);

    //set up implementation authority
    await implementationAuth.setTREXFactory(trexFactory.target);
    console.log("IAFactory: setTREXFactory success");
    await sleep(3000);
    await implementationAuth.setIAFactory(iaFactory.target);
    console.log("IAFactory: setIAFactory success");
    await sleep(3000);

    

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });