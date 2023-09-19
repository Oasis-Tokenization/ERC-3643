const Hre = require("hardhat");
const BN = require("ethers").BigNumber;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function main() {


    
    // //TIR
    // await Hre.run("verify:verify", {
    //   address: "0xDD8347600830f5061b45c9642568336344C27d76",
    //   //Path of your main contract.
    //   constructorArguments:[],
    //   contract: "contracts/registry/implementation/TrustedIssuersRegistry.sol:TrustedIssuersRegistry",
    // });
    // await sleep(3000);

    // //CTR
    // await Hre.run("verify:verify", {
    //     address: "0xb094303F075e7eF795d2bF92d9431B9F017485ca",
    //     //Path of your main contract.
    //     constructorArguments:[],
    //     contract: "contracts/registry/implementation/ClaimTopicsRegistry.sol:ClaimTopicsRegistry",
    //   });
    // await sleep(3000);

    // //IRS
    // await Hre.run("verify:verify", {
    //     address: "0x5aEEa7F7f42e27c623e750F431d82E51B95A5F40",
    //     //Path of your main contract.
    //     constructorArguments:[],
    //     contract: "contracts/registry/implementation/IdentityRegistryStorage.sol:IdentityRegistryStorage",
    //   });
    // await sleep(3000);

    // //IR
    // await Hre.run("verify:verify", {
    //     address: "0xb127b2e5868ed1111859401b2F3753875E551186",
    //     //Path of your main contract.
    //     constructorArguments:[],
    //     contract: "contracts/registry/implementation/IdentityRegistry.sol:IdentityRegistry",
    // });
    // await sleep(3000);

    // //Compliance
    // await Hre.run("verify:verify", {
    //     address: "0x74a553923F4dcF6086c9e2B7Bf0c1344cf35c6ce",
    //     //Path of your main contract.
    //     constructorArguments:[],
    //     contract: "contracts/compliance/modular/ModularCompliance.sol:ModularCompliance",
    // });
    // await sleep(3000);

    // //Token
    // await Hre.run("verify:verify", {
    //     address: "0x61888506FbEDBBbC0b6CB439EeE61be0250467B7",
    //     //Path of your main contract.
    //     constructorArguments:[],
    //     contract: "contracts/token/Token.sol:Token",
    // });
    // await sleep(3000);

    // //TREXImplementationAuthority
    // await Hre.run("verify:verify", {
    //     address: "0x7cF7F5Ef899d34b64637e0bc443525899336ddFb",
    //     //Path of your main contract.
    //     constructorArguments:[true, '0x0000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000'],
    //     contract: "contracts/proxy/authority/TREXImplementationAuthority.sol:TREXImplementationAuthority",
    // });
    // await sleep(3000);

    // //TREXFactory
    // await Hre.run("verify:verify", {
    //     address: "0xA5F96aB3858F2e230d9498c7F9D11f4Ebe2894d3",
    //     //Path of your main contract.
    //     constructorArguments:['0x7cF7F5Ef899d34b64637e0bc443525899336ddFb'],
    //     contract: "contracts/factory/TREXFactory.sol:TREXFactory",
    // });
    // await sleep(3000);

    // //IAFactory
    // await Hre.run("verify:verify", {
    //     address: "0x857e339Cf7c3DF4d9ce3a6E6fD36bb3CC07613e9",
    //     //Path of your main contract.
    //     constructorArguments:['0xA5F96aB3858F2e230d9498c7F9D11f4Ebe2894d3'],
    //     contract: "contracts/proxy/authority/IAFactory.sol:IAFactory",
    // });
    // await sleep(3000);

    // //ONCHAIN ID CONTRACTS

    // //Identity Implementation
    // await Hre.run("verify:verify", {
    //     address: "0xd2bA31b1Ece5E8aEaBE6855DE00561da1C221548",
    //     //Path of your main contract.
    //     constructorArguments:['0x000000000000000000000000000000000000dEaD', true],
    //     contract: "contracts/onchainid/Identity.sol:Identity",
    // });
    // await sleep(3000);

    // //ImplementationAuthority
    // await Hre.run("verify:verify", {
    //     address: "0x82e3C46B3C6dF4309BdaaafB9D252e67FCDA06E8",
    //     //Path of your main contract.
    //     constructorArguments:['0xd2bA31b1Ece5E8aEaBE6855DE00561da1C221548'],
    //     contract: "contracts/onchainid/proxy/ImplementationAuthority.sol:ImplementationAuthority",
    // });
    // await sleep(3000);

    // //IdFactory
    // await Hre.run("verify:verify", {
    //     address: "0x7c3cb8929ebfD6EF3711E4Afd7566b7906e24B51",
    //     //Path of your main contract.
    //     constructorArguments:['0x82e3C46B3C6dF4309BdaaafB9D252e67FCDA06E8'],
    //     contract: "contracts/onchainid/factory/IdFactory.sol:IdFactory",
    // });
    // await sleep(3000);

    // //Gateway
    // await Hre.run("verify:verify", {
    //     address: "0xb094303F075e7eF795d2bF92d9431B9F017485ca",
    //     //Path of your main contract.
    //     constructorArguments:['0xa4dC548BaCe164C03C076636CB706Cb63566002A', ['0xf7A6e076F8eB1e41F01CD4812342c191922Df761']],
    //     contract: "contracts/onchainid/gateway/Gateway.sol:Gateway",
    // });
    // await sleep(3000);

    // //TIR PROXY
    // await Hre.run("verify:verify", {
    //     address: "0x9c56b1D1a6E18cE3B1D231567A83386625e924cA",
    //     //Path of your main contract.
    //     constructorArguments:['0x82e3C46B3C6dF4309BdaaafB9D252e67FCDA06E8'],
    //     contract: "contracts/proxy/TrustedIssuersRegistryProxy.sol:TrustedIssuersRegistryProxy",
    // });
    // await sleep(3000);

    // //CTR PROXY
    // await Hre.run("verify:verify", {
    //     address: "0x74F1Be0D7B107C318B5410346c1C521658963B92",
    //     //Path of your main contract.
    //     constructorArguments:['0x82e3C46B3C6dF4309BdaaafB9D252e67FCDA06E8'],
    //     contract: "contracts/proxy/ClaimTopicsRegistryProxy.sol:ClaimTopicsRegistryProxy",
    // });
    // await sleep(5000);

    // //MC PROXY
    // await Hre.run("verify:verify", {
    //     address: "0x8c35f9bBa2A9444776F99D1A506eF9f811E1a3d8",
    //     //Path of your main contract.
    //     constructorArguments:['0x82e3C46B3C6dF4309BdaaafB9D252e67FCDA06E8'],
    //     contract: "contracts/proxy/ModularComplianceProxy.sol:ModularComplianceProxy",
    // });
    // await sleep(5000);

    // //IRS PROXY
    // await Hre.run("verify:verify", {
    //     address: "0x775309338c0d010934E3873D8d4e00e9049A166f",
    //     //Path of your main contract.
    //     constructorArguments:['0x82e3C46B3C6dF4309BdaaafB9D252e67FCDA06E8'],
    //     contract: "contracts/proxy/IdentityRegistryStorageProxy.sol:IdentityRegistryStorageProxy",
    // });
    // await sleep(5000);

    //IR PROXY
    await Hre.run("verify:verify", {
        address: "0x4944E26265594282d685A9Cb5A3E52C182DB2044",
        //Path of your main contract.
        constructorArguments:['0x7cF7F5Ef899d34b64637e0bc443525899336ddFb','0x9c56b1D1a6E18cE3B1D231567A83386625e924cA','0x74F1Be0D7B107C318B5410346c1C521658963B92','0x775309338c0d010934E3873D8d4e00e9049A166f'],
        contract: "contracts/proxy/IdentityRegistryProxy.sol:IdentityRegistryProxy",
    });
    await sleep(5000);

    // //TOKEN PROXY
    // await Hre.run("verify:verify", {
    //     address: "0x20A2934f168dC03fc7B9888b272b3B10Eddcf9BB",
    //     //Path of your main contract.
    //     constructorArguments:['0x7cF7F5Ef899d34b64637e0bc443525899336ddFb','0x4944E26265594282d685A9Cb5A3E52C182DB2044','0x8c35f9bBa2A9444776F99D1A506eF9f811E1a3d8','OTATEST','OTAT',18,'0x0000000000000000000000000000000000000000'],
    //     contract: "contracts/proxy/TokenProxy.sol:TokenProxy",
    // });
    // await sleep(5000);

    // //IDENTITY PROXY
    // await Hre.run("verify:verify", {
    //     address: "0xc61c0a9A294e98CE2c790a7c7075666790155de2",
    //     //Path of your main contract.
    //     constructorArguments:['0x82e3C46B3C6dF4309BdaaafB9D252e67FCDA06E8','0x7c3cb8929ebfD6EF3711E4Afd7566b7906e24B51'],
    //     contract: "contracts/onchainid/proxy/IdentityProxy.sol:IdentityProxy",
    // });
    // await sleep(5000);


};

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});