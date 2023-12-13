const BN = require("ethers").BigNumber;
const { Hre, ethers, web3 } = require("hardhat");
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
    let totalGasCost = await ethers.provider.estimateGas(await TIR.getDeployTransaction());

    console.log("deployGas : ", totalGasCost);
    
    let ctrDeployCost = await ethers.provider.estimateGas(await CTR.getDeployTransaction());
    console.log("CTR DeployGasCost: ", ctrDeployCost);
    totalGasCost += ctrDeployCost;
    console.log("total gas: ", totalGasCost);

    let irsDeployCost = await ethers.provider.estimateGas(await IRS.getDeployTransaction());
    console.log("irsDeployCost: ", irsDeployCost);
    totalGasCost += irsDeployCost;
    console.log("total gas cost: ", totalGasCost);

    let irDeployCost = await ethers.provider.estimateGas(await IR.getDeployTransaction());
    console.log("irDeployCost: ", irDeployCost);
    totalGasCost += irDeployCost;
    console.log("total gas cost: ", totalGasCost);

    let complianceDeployCost = await ethers.provider.estimateGas(await COMPLIANCE.getDeployTransaction());
    console.log("compliance deploy cost: ", complianceDeployCost);
    totalGasCost += complianceDeployCost;
    console.log("total gas cost: ", totalGasCost);

    let tokenDeployCost = await ethers.provider.estimateGas(await TOKENIMPL.getDeployTransaction());
    console.log("token deploy cost: ", tokenDeployCost);
    totalGasCost += tokenDeployCost;
    console.log("total gas cost: ", totalGasCost);

    let curGasPrice = (await ethers.provider.getFeeData()).gasPrice;
    console.log("cur gas price: ", curGasPrice);

    let requiredBalance = curGasPrice * totalGasCost;
    let curBalance = await ethers.provider.getBalance(deployer.address);
    console.log("required balance: ", requiredBalance);
    console.log("cur balance: ", curBalance);

    if(curBalance - requiredBalance <= 0) {
      console.log("not enough balance");
    } else {
      console.log("extra balance: ", curBalance - requiredBalance);

      let tir = await TIR.deploy();
      await tir.waitForDeployment();
      console.log("tir: ", tir.target);

      let ctr = await CTR.deploy();
      await ctr.waitForDeployment();
      console.log("ctr: ", ctr.target);

      let irs = await IRS.deploy();
      await irs.waitForDeployment();
      console.log("irs: ", irs.target);

      let ir = await IR.deploy();
      await ir.waitForDeployment();
      console.log("ir: ", ir.target);

      let compliance = await COMPLIANCE.deploy();
      await compliance.waitForDeployment();
      console.log("compliance: ", compliance.target);

      let token = await TOKENIMPL.deploy();
      await token.waitForDeployment();
      console.log("token: ", token.target);
    }
    
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });