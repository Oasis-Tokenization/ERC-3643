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
    let tir = await TIR.deploy();
    await tir.waitForDeployment();
    console.log("TIR: ", tir.target);
    await sleep(5000);
    let estimatedGas = await tir.init.estimateGas();
    console.log("estimated gas for TIR init : ", estimatedGas);
    let tirInitTx = await tir.init();
    await tirInitTx.wait();
    console.log("TIR impl initialized");
    await sleep(5000);
    
    let ctr = await CTR.deploy();
    await ctr.waitForDeployment();
    console.log("CTR: ", ctr.target);
    await sleep(5000);
    estimatedGas = await ctr.init.estimateGas();
    console.log("estimated gas for CTR init: ", estimatedGas);
    let ctrInitTx = await ctr.init({gasLimit: estimatedGas * BigInt(2)});
    await ctrInitTx.wait();
    console.log("CTR impl initialized");
    await sleep(5000);

    let irs = await IRS.deploy();
    await irs.waitForDeployment();
    console.log("IRS: ", irs.target);
    await sleep(5000);
    let irsInitTx = await irs.init();
    await irsInitTx.wait();
    console.log("IRS impl initialized");
    await sleep(5000);

    let ir = await IR.deploy();
    await ir.waitForDeployment();
    console.log("IR: ", ir.target);
    await sleep(5000);
    let irInitTx = await ir.init(tir.target, ctr.target, irs.target);
    await irInitTx.wait();
    console.log("IR impl initialized");
    await sleep(5000);

    let compliance = await COMPLIANCE.deploy();
    await compliance.waitForDeployment();
    console.log("Compliance: ", compliance.target);
    await sleep(5000);
    let complianceInitTx = await compliance.init();
    await complianceInitTx.wait();
    console.log("Compliance impl initialized");
    await sleep(5000);

    let token = await TOKENIMPL.deploy();
    await token.waitForDeployment();
    console.log("Token Implementation: ", token.target);
    await sleep(5000);
    //TODO change symbol and name to "reference" ? 
    let tokenInitTx = await token.init(ir.target, compliance.target, "reference", "reference", 18, ZERO_ADDRESS);
    await tokenInitTx.wait();
    console.log("Token impl initialized");
    await sleep(5000);

    // //TREXContracts
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

    // deploy implementation authority
    let implementationAuth = await IMPLAUTH.deploy(true, ZERO_ADDRESS, ZERO_ADDRESS);
    await implementationAuth.waitForDeployment();
    await sleep(5000);
    console.log("Reference Impl Auth : ", implementationAuth.target);
    let addAndUseTx = await implementationAuth.addAndUseTREXVersion(TREXversion, TREXcontracts);
    await addAndUseTx.wait();
    console.log("addAndUseTREXVersion success", );
    await sleep(5000);

    // deploy and set up TREX Token Factory
    let trexFactory = await TREXFACTORY.deploy(implementationAuth.target);
    await trexFactory.waitForDeployment();
    console.log("TREX Factory: ", trexFactory.target);
    await sleep(5000);

    // deploy IAFactory
    let iaFactory = await IAFACTORY.deploy(trexFactory.target);
    await iaFactory.waitForDeployment();
    console.log("IAFactory :", iaFactory.target);
    await sleep(5000);

    //set up implementation authority
    let setTrexTx = await implementationAuth.setTREXFactory(trexFactory.target);
    await setTrexTx.wait();
    console.log("IAFactory: setTREXFactory success");
    await sleep(5000);
    let setIaFactTx = await implementationAuth.setIAFactory(iaFactory.target);
    await setIaFactTx.wait();
    console.log("IAFactory: setIAFactory success");
    await sleep(5000);

    

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });