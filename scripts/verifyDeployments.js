const Hre = require("hardhat");
const BN = require("ethers").BigNumber;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function main() {


    
    // //TIR
    // await Hre.run("verify:verify", {
    //   address: "0xaf1962ee77b60f591246349f671279f5d9b7c296",
    //   //Path of your main contract.
    //   constructorArguments:[],
    //   contract: "contracts/registry/implementation/TrustedIssuersRegistry.sol:TrustedIssuersRegistry",
    // });
    // await sleep(3000);

    // //CTR
    // await Hre.run("verify:verify", {
    //     address: "0x417E41a73B1B323b0Ca7dC063041783D9be59F41",
    //     //Path of your main contract.
    //     constructorArguments:[],
    //     contract: "contracts/registry/implementation/ClaimTopicsRegistry.sol:ClaimTopicsRegistry",
    //   });
    // await sleep(3000);

    // //IRS
    // await Hre.run("verify:verify", {
    //     address: "0x8E58fa18ccE55FC7271f90fE3184a3E99ede6152",
    //     //Path of your main contract.
    //     constructorArguments:[],
    //     contract: "contracts/registry/implementation/IdentityRegistryStorage.sol:IdentityRegistryStorage",
    //   });
    // await sleep(3000);

    // //IR
    // await Hre.run("verify:verify", {
    //     address: "0x6D7d97d76759709b0e875cb834B5adE44cB3974E",
    //     //Path of your main contract.
    //     constructorArguments:[],
    //     contract: "contracts/registry/implementation/IdentityRegistry.sol:IdentityRegistry",
    // });
    // await sleep(3000);

    // //Compliance
    // await Hre.run("verify:verify", {
    //     address: "0xE0007E4B6d6d60908477d7f08789821B128D1ff7",
    //     //Path of your main contract.
    //     constructorArguments:[],
    //     contract: "contracts/compliance/modular/ModularCompliance.sol:ModularCompliance",
    // });
    // await sleep(3000);

    // //Token
    // await Hre.run("verify:verify", {
    //     address: "0xa6b450318Dc84E502ff6843097D5959278393a2B",
    //     //Path of your main contract.
    //     constructorArguments:[],
    //     contract: "contracts/token/Token.sol:Token",
    // });
    // await sleep(3000);

    // //TREXImplementationAuthority
    // await Hre.run("verify:verify", {
    //     address: "0xB2303a6e3Db4E48E4517244B1d1a6b02E201f817",
    //     //Path of your main contract.
    //     constructorArguments:[true, '0x0000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000'],
    //     contract: "contracts/proxy/authority/TREXImplementationAuthority.sol:TREXImplementationAuthority",
    // });
    // await sleep(3000);

    // //TREXFactory
    // await Hre.run("verify:verify", {
    //     address: "0xbC5667121cbF372FDA11d53c6DaD13f2d657E41A",
    //     //Path of your main contract.
    //     constructorArguments:['0xB2303a6e3Db4E48E4517244B1d1a6b02E201f817'],
    //     contract: "contracts/factory/TREXFactory.sol:TREXFactory",
    // });
    // await sleep(3000);

    //IAFactory
    await Hre.run("verify:verify", {
        address: "0xC174658E6a376a074D3D45e2bDB44731BaB27657",
        //Path of your main contract.
        constructorArguments:['0xbC5667121cbF372FDA11d53c6DaD13f2d657E41A'],
        contract: "contracts/proxy/authority/IAFactory.sol:IAFactory",
    });
    await sleep(3000);

    //ONCHAIN ID CONTRACTS

    // //Identity Implementation
    // await Hre.run("verify:verify", {
    //     address: "0x6056a9927bec03A652B6F57782a32C3BaDbd7B2a",
    //     //Path of your main contract.
    //     constructorArguments:['0x000000000000000000000000000000000000dEaD', true],
    //     contract: "contracts/onchainid/Identity.sol:Identity",
    // });
    // await sleep(3000);

    // //ImplementationAuthority
    // await Hre.run("verify:verify", {
    //     address: "0x4Dc25BEC44cC7B221C8Bbf81D4b900868E7BF1F2",
    //     //Path of your main contract.
    //     constructorArguments:['0x6056a9927bec03A652B6F57782a32C3BaDbd7B2a'],
    //     contract: "contracts/onchainid/proxy/ImplementationAuthority.sol:ImplementationAuthority",
    // });
    // await sleep(3000);

    // //IdFactory
    // await Hre.run("verify:verify", {
    //     address: "0x4Ce5ac9611c84c71917f857467deCB7e9c30ca76",
    //     //Path of your main contract.
    //     constructorArguments:['0x4Dc25BEC44cC7B221C8Bbf81D4b900868E7BF1F2'],
    //     contract: "contracts/onchainid/factory/IdFactory.sol:IdFactory",
    // });
    // await sleep(3000);

    // //Gateway
    // await Hre.run("verify:verify", {
    //     address: "0x90E4Ad17955708bD9e553BFe269C6218F7955680",
    //     //Path of your main contract.
    //     constructorArguments:['0x4Ce5ac9611c84c71917f857467deCB7e9c30ca76', []],
    //     contract: "contracts/onchainid/gateway/Gateway.sol:Gateway",
    // });
    // await sleep(3000);
    
    //TREX SUITE CONTRACTS

    // //TIR PROXY
    // await Hre.run("verify:verify", {
    //     address: "0xA79Aea546434580CFB87085D77460dC5334187bb",
    //     //Path of your main contract.
    //     constructorArguments:['0x036405C81e884D35FA8DF03A578B70FfFB76a598'],
    //     contract: "contracts/proxy/TrustedIssuersRegistryProxy.sol:TrustedIssuersRegistryProxy",
    // });
    // await sleep(3000);

    // //CTR PROXY
    // await Hre.run("verify:verify", {
    //     address: "0x41bc7B58e3324CD80a4530f9CdAC41E5880C0813",
    //     //Path of your main contract.
    //     constructorArguments:['0x036405C81e884D35FA8DF03A578B70FfFB76a598'],
    //     contract: "contracts/proxy/ClaimTopicsRegistryProxy.sol:ClaimTopicsRegistryProxy",
    // });
    // await sleep(5000);

    // //MC PROXY
    // await Hre.run("verify:verify", {
    //     address: "0x5De59B5f57E479c12B9BEF1Ef90e3dB9763076B8",
    //     //Path of your main contract.
    //     constructorArguments:['0x036405C81e884D35FA8DF03A578B70FfFB76a598'],
    //     contract: "contracts/proxy/ModularComplianceProxy.sol:ModularComplianceProxy",
    // });
    // await sleep(5000);

    // //IRS PROXY
    // await Hre.run("verify:verify", {
    //     address: "0x0b4e730C62A1fD4E0Bda07faB857645228F19da8",
    //     //Path of your main contract.
    //     constructorArguments:['0x036405C81e884D35FA8DF03A578B70FfFB76a598'],
    //     contract: "contracts/proxy/IdentityRegistryStorageProxy.sol:IdentityRegistryStorageProxy",
    // });
    // await sleep(5000);

    // //IR PROXY
    // await Hre.run("verify:verify", {
    //     address: "0x4331578741a6432266076e24c6674bE2BB0C7242",
    //     //Path of your main contract.
    //     constructorArguments:['0x036405C81e884D35FA8DF03A578B70FfFB76a598','0xA79Aea546434580CFB87085D77460dC5334187bb','0x41bc7B58e3324CD80a4530f9CdAC41E5880C0813','0x0b4e730C62A1fD4E0Bda07faB857645228F19da8'],
    //     contract: "contracts/proxy/IdentityRegistryProxy.sol:IdentityRegistryProxy",
    // });
    // await sleep(5000);

    // // TOKEN PROXY
    // await Hre.run("verify:verify", {
    //     address: "0x205FA2dB869370b54B5780f7334AbdD94f0A6c5E",
    //     //Path of your main contract.
    //     constructorArguments:['0x036405C81e884D35FA8DF03A578B70FfFB76a598','0x4331578741a6432266076e24c6674bE2BB0C7242','0x5De59B5f57E479c12B9BEF1Ef90e3dB9763076B8','OPTESTNAME20231023A','OPTESTSYMBOL20231023A',18,'0x0000000000000000000000000000000000000000'],
    //     contract: "contracts/proxy/TokenProxy.sol:TokenProxy",
    // });
    // await sleep(5000);

    // // IDENTITY PROXY
    // await Hre.run("verify:verify", {
    //     address: "0x54497d92e9f0e17574fe658c421952d1de861fcb",
    //     //Path of your main contract.
    //     constructorArguments:['0x4Dc25BEC44cC7B221C8Bbf81D4b900868E7BF1F2','0x76dBB17fd42a7adA701841EC852d9dE4978a8511'],
    //     contract: "contracts/onchainid/proxy/IdentityProxy.sol:IdentityProxy",
    // });
    // await sleep(5000);

//     //OWNER MANAGER
//     await Hre.run("verify:verify", {
//       address: "0x0be85b4b0bc57ffd9a4b263e7b285aa7e4b5a071",
//       //Path of your main contract.
//       constructorArguments:['0x205FA2dB869370b54B5780f7334AbdD94f0A6c5E'],
//       contract: "contracts/roles/permissioning/owner/OwnerManager.sol:OwnerManager",
//     });

//    //AGENT MANAGER
//     await Hre.run("verify:verify", {
//       address: "0xE00994Ff545Ba960690D8d44905cEf912E22ee61",
//       //Path of your main contract.
//       constructorArguments:['0x205FA2dB869370b54B5780f7334AbdD94f0A6c5E'],
//       contract: "contracts/roles/permissioning/agent/AgentManager.sol:AgentManager",
//     });
//   await sleep(5000);

};

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});