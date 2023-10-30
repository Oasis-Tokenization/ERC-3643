const Hre = require("hardhat");
const BN = require("ethers").BigNumber;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function main() {


    
    // //TIR
    // await Hre.run("verify:verify", {
    //   address: "0x22D9cD0B601Ed7c775FABD3ADFc0d331D50D5B77",
    //   //Path of your main contract.
    //   constructorArguments:[],
    //   contract: "contracts/registry/implementation/TrustedIssuersRegistry.sol:TrustedIssuersRegistry",
    // });
    // await sleep(3000);

    // //CTR
    // await Hre.run("verify:verify", {
    //     address: "0xfC23bD66875Cc63db746C0033987A618aac4D899",
    //     //Path of your main contract.
    //     constructorArguments:[],
    //     contract: "contracts/registry/implementation/ClaimTopicsRegistry.sol:ClaimTopicsRegistry",
    //   });
    // await sleep(3000);

    // //IRS
    // await Hre.run("verify:verify", {
    //     address: "0x7879AAC3F82E6c8fEf84b39C7F7153C08664e549",
    //     //Path of your main contract.
    //     constructorArguments:[],
    //     contract: "contracts/registry/implementation/IdentityRegistryStorage.sol:IdentityRegistryStorage",
    //   });
    // await sleep(3000);

    // //IR
    // await Hre.run("verify:verify", {
    //     address: "0x076e2372617281bc34a5c950da50F8E77E99F545",
    //     //Path of your main contract.
    //     constructorArguments:[],
    //     contract: "contracts/registry/implementation/IdentityRegistry.sol:IdentityRegistry",
    // });
    // await sleep(3000);

    // //Compliance
    // await Hre.run("verify:verify", {
    //     address: "0xFF8a62e9c4A512Fe9E56cED132dFc268286003fE",
    //     //Path of your main contract.
    //     constructorArguments:[],
    //     contract: "contracts/compliance/modular/ModularCompliance.sol:ModularCompliance",
    // });
    // await sleep(3000);

    // //Token
    // await Hre.run("verify:verify", {
    //     address: "0xB7685984501ABea93B9706760cDBB2278df88c35",
    //     //Path of your main contract.
    //     constructorArguments:[],
    //     contract: "contracts/token/Token.sol:Token",
    // });
    // await sleep(3000);

    // //TREXImplementationAuthority
    // await Hre.run("verify:verify", {
    //     address: "0xCccFc26f7D6a18B20E9f3F8c61d1D1609f2991F6",
    //     //Path of your main contract.
    //     constructorArguments:[true, '0x0000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000'],
    //     contract: "contracts/proxy/authority/TREXImplementationAuthority.sol:TREXImplementationAuthority",
    // });
    // await sleep(3000);

    // //TREXFactory
    // await Hre.run("verify:verify", {
    //     address: "0x6b4b194c163E825F15b1ee73F6f890c33f91DD01",
    //     //Path of your main contract.
    //     constructorArguments:['0xCccFc26f7D6a18B20E9f3F8c61d1D1609f2991F6'],
    //     contract: "contracts/factory/TREXFactory.sol:TREXFactory",
    // });
    // await sleep(3000);

    // //IAFactory
    // await Hre.run("verify:verify", {
    //     address: "0x466B7b13DaFF9EBBF7C5dEdF24BeC5f9b997aC43",
    //     //Path of your main contract.
    //     constructorArguments:['0x6b4b194c163E825F15b1ee73F6f890c33f91DD01'],
    //     contract: "contracts/proxy/authority/IAFactory.sol:IAFactory",
    // });
    // await sleep(3000);

    //ONCHAIN ID CONTRACTS

    // //Identity Implementation
    // await Hre.run("verify:verify", {
    //     address: "0xeE21e06B056DAE5a2416fa10c26E3048094D5f08",
    //     //Path of your main contract.
    //     constructorArguments:['0x000000000000000000000000000000000000dEaD', true],
    //     contract: "contracts/onchainid/Identity.sol:Identity",
    // });
    // await sleep(3000);

    // //ImplementationAuthority
    // await Hre.run("verify:verify", {
    //     address: "0xf3d856607ee3e39980602732B9ddB8268A135C2D",
    //     //Path of your main contract.
    //     constructorArguments:['0xeE21e06B056DAE5a2416fa10c26E3048094D5f08'],
    //     contract: "contracts/onchainid/proxy/ImplementationAuthority.sol:ImplementationAuthority",
    // });
    // await sleep(3000);

    // //IdFactory
    // await Hre.run("verify:verify", {
    //     address: "0x347c3021B6B9C8bE287e97dA1246786B9f06a7C4",
    //     //Path of your main contract.
    //     constructorArguments:['0xf3d856607ee3e39980602732B9ddB8268A135C2D'],
    //     contract: "contracts/onchainid/factory/IdFactory.sol:IdFactory",
    // });
    // await sleep(3000);

    // //Gateway
    // await Hre.run("verify:verify", {
    //     address: "0x25f08949a2fD895d106856E8f32f4616E68Ddd40",
    //     //Path of your main contract.
    //     constructorArguments:['0xE496e8A2830EBa93a5Fdc72E271e637d280b7c9B', []],
    //     contract: "contracts/onchainid/gateway/Gateway.sol:Gateway",
    // });
    // await sleep(3000);

    // //TIR PROXY
    // await Hre.run("verify:verify", {
    //     address: "0x7e020d203a3bef4011311e9b1b194c187928c666",
    //     //Path of your main contract.
    //     constructorArguments:['0xCccFc26f7D6a18B20E9f3F8c61d1D1609f2991F6'],
    //     contract: "contracts/proxy/TrustedIssuersRegistryProxy.sol:TrustedIssuersRegistryProxy",
    // });
    // await sleep(3000);

    // //CTR PROXY
    // await Hre.run("verify:verify", {
    //     address: "0xf082c15a855cf7dca69bd18637369a74dd4ee8a9",
    //     //Path of your main contract.
    //     constructorArguments:['0xCccFc26f7D6a18B20E9f3F8c61d1D1609f2991F6'],
    //     contract: "contracts/proxy/ClaimTopicsRegistryProxy.sol:ClaimTopicsRegistryProxy",
    // });
    // await sleep(5000);

    // //MC PROXY
    // await Hre.run("verify:verify", {
    //     address: "0x9acf4b70eeceaa16a9925b6b771725695dfc8edf",
    //     //Path of your main contract.
    //     constructorArguments:['0xCccFc26f7D6a18B20E9f3F8c61d1D1609f2991F6'],
    //     contract: "contracts/proxy/ModularComplianceProxy.sol:ModularComplianceProxy",
    // });
    // await sleep(5000);

    // //IRS PROXY
    // await Hre.run("verify:verify", {
    //     address: "0xa8ba6a026da9eda27e491f66e16e42dbe6c18c9d",
    //     //Path of your main contract.
    //     constructorArguments:['0xCccFc26f7D6a18B20E9f3F8c61d1D1609f2991F6'],
    //     contract: "contracts/proxy/IdentityRegistryStorageProxy.sol:IdentityRegistryStorageProxy",
    // });
    // await sleep(5000);

    // //IR PROXY
    // await Hre.run("verify:verify", {
    //     address: "0x6dabb69dcfbc02c3e15daf744e1d2e09f2e48691",
    //     //Path of your main contract.
    //     constructorArguments:['0xCccFc26f7D6a18B20E9f3F8c61d1D1609f2991F6','0x7e020d203a3bef4011311e9b1b194c187928c666','0xf082c15a855cf7dca69bd18637369a74dd4ee8a9','0xa8ba6a026da9eda27e491f66e16e42dbe6c18c9d'],
    //     contract: "contracts/proxy/IdentityRegistryProxy.sol:IdentityRegistryProxy",
    // });
    // await sleep(5000);

    // //TOKEN PROXY
    // await Hre.run("verify:verify", {
    //     address: "0xa88625e8c19fbb705ebb6d85615abddd9cb010db",
    //     //Path of your main contract.
    //     constructorArguments:['0xCccFc26f7D6a18B20E9f3F8c61d1D1609f2991F6','0x6dabb69dcfbc02c3e15daf744e1d2e09f2e48691','0x9acf4b70eeceaa16a9925b6b771725695dfc8edf','TEST','TEST',18,'0x0000000000000000000000000000000000000000'],
    //     contract: "contracts/proxy/TokenProxy.sol:TokenProxy",
    // });
    // await sleep(5000);

  //   //IDENTITY PROXY
  //   await Hre.run("verify:verify", {
  //       address: "0xc61c0a9A294e98CE2c790a7c7075666790155de2",
  //       //Path of your main contract.
  //       constructorArguments:['0x82e3C46B3C6dF4309BdaaafB9D252e67FCDA06E8','0x7c3cb8929ebfD6EF3711E4Afd7566b7906e24B51'],
  //       contract: "contracts/onchainid/proxy/IdentityProxy.sol:IdentityProxy",
  //   });
  //   await sleep(5000);

  //   //OWNER MANAGER
  //   await Hre.run("verify:verify", {
  //     address: "0x320CDF16CeFa9109325919535C8b6E89C5097573",
  //     //Path of your main contract.
  //     constructorArguments:['0x9621D3F71A5464E3784b11bC1b859de4e9C6D7A9'],
  //     contract: "contracts/roles/permissioning/owner/OwnerManager.sol:OwnerManager",
  //   });

  //  //AGENT MANAGER
  //   await Hre.run("verify:verify", {
  //     address: "0x69983e775907854303312f79FF0b5817f6de5cE9",
  //     //Path of your main contract.
  //     constructorArguments:['0x9621D3F71A5464E3784b11bC1b859de4e9C6D7A9'],
  //     contract: "contracts/roles/permissioning/agent/AgentManager.sol:AgentManager",
  //   });
  // await sleep(5000);

};

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});