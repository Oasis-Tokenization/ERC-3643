const { expect } = require("chai");
const { Signer } = require("ethers");
const { ethers, web3 } = require("hardhat");
const { factory } = require("typescript");
const BN = require("ethers").BigNumber;


function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function getIdAddressFromTx(tx, idFactory, walletAddress) {
  let keccakWalletLinkedEvent = ethers.id("WalletLinked(address,address)");
  //see ethers v6 filter && topicfilter 
  let event = await ethers.provider.getLogs({
    fromBlock: tx.blockNumber,
    toBlock: tx.blockNumber,
    address: idFactory,
    topics: [keccakWalletLinkedEvent, ethers.zeroPadValue(walletAddress, 32)]
  });
  return ethers.dataSlice(event[0].topics[2], 12);
}

describe("TREX Token Testing", async () => {
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
  const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD';

  beforeEach( async () => {
    [otaDeployer, otaSafe1, otaSafe2, methSafe, hacker, kycClaimIssuer, investor] = await ethers.getSigners();
    
    accounts = await ethers.getSigners();
    provider = await ethers.provider;

    let IMPLAUTH = await ethers.getContractFactory("TREXImplementationAuthority");
    let IAFACTORY = await ethers.getContractFactory("IAFactory");
    let TREXFACTORY = await ethers.getContractFactory("TREXFactory");
    let TOKENIMPL = await ethers.getContractFactory("Token");
    let CTR = await ethers.getContractFactory("ClaimTopicsRegistry");
    let IR = await ethers.getContractFactory("IdentityRegistry");
    let IRS = await ethers.getContractFactory("IdentityRegistryStorage");
    let TIR = await ethers.getContractFactory("TrustedIssuersRegistry");
    let COMPLIANCE = await ethers.getContractFactory("ModularCompliance");
    let IMPLAUTHID = await ethers.getContractFactory("ImplementationAuthority");
    let IDFACTORY = await ethers.getContractFactory("IdFactory");
    // Gateway has a public function 
    let GATEWAY = await ethers.getContractFactory("Gateway");
    let IDENTITY = await ethers.getContractFactory("Identity");
    // let CLAIMISSUER = await ethers.getContractFactory("ClaimIssuer");
    let AGENTMANAGER = await ethers.getContractFactory("AgentManager");
    let OWNERMANAGER = await ethers.getContractFactory("OwnerManager");
    let COUNTRYRESTRICTMODULE = await ethers.getContractFactory("CountryRestrictModule");
    let CLAIMISSUER = await ethers.getContractFactory("ClaimIssuer");

    //SCRIPT 1 - deployFactory.js
    tir = await TIR.deploy();
    await tir.init();

    ctr = await CTR.deploy();
    await ctr.init();

    irs = await IRS.deploy();
    await irs.init();

    ir = await IR.deploy();
    await ir.init(tir.target, ctr.target, irs.target);
    
    compliance = await COMPLIANCE.deploy();
    await compliance.init();

    token = await TOKENIMPL.deploy();
    await token.init(ir.target, compliance.target, "OTAMETHTEST", "OTAMT", 18, ZERO_ADDRESS);

    claimIssuerIdentity = await CLAIMISSUER.deploy(kycClaimIssuer.address);
    console.log("Claim Issuer Identity : ", claimIssuerIdentity.target);

    let TREXcontracts = {
        tokenImplementation: token.target,
        ctrImplementation: ctr.target,
        irImplementation: ir.target,
        irsImplementation: irs.target,
        tirImplementation: tir.target,
        mcImplementation: compliance.target
    }

    let TREXversion = {
        major: 4,
        minor: 0,
        patch: 1
    }

     //deploy implementation authority
     implementationAuth = await IMPLAUTH.deploy(true, ZERO_ADDRESS, ZERO_ADDRESS);
     await implementationAuth.addAndUseTREXVersion(TREXversion, TREXcontracts);
 
     // deploy and set up TREX Token Factory
     trexFactory = await TREXFACTORY.deploy (implementationAuth.target);
 
     // deploy IAFactory
     iaFactory = await IAFACTORY.deploy(trexFactory.target);
 
     //set up implementation authority
     await implementationAuth.setTREXFactory(trexFactory.target);
     await implementationAuth.setIAFactory(iaFactory.target);

    //SCRIPT 2 - deployOnchainid.js
    // deploy identity implementation and implementation authority, link Identity.sol implementation
    idImpl = await IDENTITY.deploy(DEAD_ADDRESS, true);
    implAuthId = await IMPLAUTHID.deploy(idImpl.target);
    //deploy IDFactory.sol
    idFactory = await IDFACTORY.deploy(implAuthId.target);
    //set up signersToApprove for gateway constructor (empty for now)
    let signersToApprove = [];
    //deploy Gateway.sol
    idGateway = await GATEWAY.deploy(idFactory.target, signersToApprove);
    //transferOwnership of IdFactory to gateway
    await idFactory.transferOwnership(idGateway.target);
    //deploy Identity.sol contract for OTA1 multisig (otaSafe1)
    let otaSafeIdTx = await idGateway.deployIdentityForWallet(otaSafe1.address);
    //getIdAddressFromTx(tx, idFactory, walletAddress)
    otaSafe1IdAddr = await getIdAddressFromTx(otaSafeIdTx, idFactory.target, otaSafe1.address);
    
    // let otaSafeIdEvent = await idFactory.filters.WalletLinked(otaSafe1.address);
    // console.log("otaSafeIdEvent", otaSafeIdEvent);
    // console.log("safe1receipt :", safe1Receipt.logs);
    // let safe1Event = safe1Receipt.logs?.filter((x) => {
    //     return x.topics[0] == keccakWalletLinkedEvent
    // });
    // otaSafeAddr = safe1Event[0].args.identity;
    // console.log("OTASAFE1 IDENTITY ADDR : ", otaSafeAddr);
  
    //SCRIPT 3 - deployToken.js
    //set token details and deploy token

    let tokenDetails = {
        owner: otaDeployer.address,
        name: "OPMTEST102023A",
        symbol: "OPMTEST102023A",
        decimals: 18,
        irs: ZERO_ADDRESS,
        ONCHAINID: ZERO_ADDRESS,
        irAgents: [],
        tokenAgents: [],
        complianceModules: [],
        complianceSettings: []
    };
    let claimDetails = {
        claimTopics: [1],
        issuers: [claimIssuerIdentity.target],
        issuerClaims: [[1]]
    };

    const TOKENTX = await trexFactory.deployTREXSuite("OTAMT", tokenDetails, claimDetails);
    let receipt = await TOKENTX.wait();
    let event = receipt.logs?.filter((x) => {
        return x.eventName == 'TREXSuiteDeployed'
    });
    deployedToken = await TOKENIMPL.attach(event[0].args._token);
    console.log("deployer address : ", otaDeployer.address);
    console.log("token owner : ", await deployedToken.owner());

    //SCRIPT 4 - setupManagers.js
    agentManager = await AGENTMANAGER.deploy(deployedToken.target);
    console.log("agentManager address : ", agentManager.target);
    //grant AgentManager Agent role on Token
    await deployedToken.addAgent(agentManager.target);
    //grant AgentManager Agent role on Identity Registry
    await (await IR.attach(await deployedToken.identityRegistry())).addAgent(agentManager.target);
    //confirm roles were added
    console.log("Agent Manager is Agent Token ? : ", await deployedToken.isAgent(agentManager.target));
    console.log("Agent Manager is Agent on IR? : ", await (await IR.attach(await deployedToken.identityRegistry())).isAgent(agentManager.target));
    //grant all (token) operation roles to otaSafe1Identity
    await agentManager.addSupplyModifier(otaSafe1IdAddr);
    await agentManager.addFreezer(otaSafe1IdAddr);
    await agentManager.addTransferManager(otaSafe1IdAddr);
    await agentManager.addRecoveryAgent(otaSafe1IdAddr);
    await agentManager.addComplianceAgent(otaSafe1IdAddr);
    await agentManager.addWhiteListManager(otaSafe1IdAddr);

    //confirm management key on otaSafe1Id
    otaSafe1Id = await IDENTITY.attach(otaSafe1IdAddr);

    //grant action key to otaSafe2
    let otaSafe2Key = ethers.keccak256(ethers.AbiCoder.defaultAbiCoder().encode(["address"], [otaSafe2.address]));
    await otaSafe1Id.connect(otaSafe1).addKey(otaSafe2Key, 2, 1);

    //set ownermanager contracts
    ownerManager = await OWNERMANAGER.deploy(deployedToken.target);
    deployedIdentityRegistry = await IR.attach(await deployedToken.identityRegistry());
    deployedCompliance = await COMPLIANCE.attach(await deployedToken.compliance());
    deployedIssuersRegistry = await TIR.attach(await deployedIdentityRegistry.issuersRegistry());  
    deployedTopicsRegistry = await CTR.attach(await deployedIdentityRegistry.topicsRegistry());
    
    // //transfer ownership of token contracts to ownerManager
    // await token.transferOwnership(ownerManager.target);
    // await deployedIdentityRegistry.transferOwnership(ownerManager.target);
    // await deployedIssuersRegistry.transferOwnership(ownerManager.target);
    // await deployedTopicsRegistry.transferOwnership(ownerManager.target);
    // await deployedCompliance.transferOwnership(ownerManager.target);

    // //SCRIPT 5 - transferOwnershipAndVerify.js
    // await trexFactory.transferOwnership(methSafe.address);
    // await implementationAuth.transferOwnership(methSafe.address);
    // await idGateway.transferOwnership(methSafe.address);
    // await implAuthId.transferOwnership(methSafe.address);
    // await ownerManager.transferOwnership(methSafe.address);
    // await agentManager.transferOwnership(methSafe.address);
    //DO WE NEED TO PASS IMPLEMENTATION CONTRACTS?  I see no pressing need

  })  

  it("Token Details", async() => {
    expect(await deployedToken.name()).to.be.equal("OPMTEST102023A");
    expect(await deployedToken.symbol()).to.be.equal("OPMTEST102023A");
    expect(await deployedToken.decimals()).to.be.equal(18);
  });


  it("OTA1 OnchainID tests", async () => {
    let otaSafe1Key = ethers.keccak256(ethers.AbiCoder.defaultAbiCoder().encode(["address"], [otaSafe1.address]));
    expect(await otaSafe1Id.keyHasPurpose(otaSafe1Key, 1)).to.be.equal(true);
    expect(await otaSafe1Id.getKeysByPurpose(1)).to.include(otaSafe1Key);
    expect(await otaSafe1Id.getKeysByPurpose(1)).to.have.lengthOf(1);
    expect(await otaSafe1Id.getKeyPurposes(otaSafe1Key)).to.have.lengthOf(1);
    expect(await otaSafe1Id.getKeyPurposes(otaSafe1Key)).to.include((ethers.getBigInt(1)));
  });

  it("Verify Claim Issuances are required to hold token", async () => {
    let investorIdentityTx = await idGateway.deployIdentityForWallet(investor.address);
    let investorIdentity = await getIdAddressFromTx(investorIdentityTx, idFactory.target, investor.address);
    let investorIdentityContract = await (await ethers.getContractFactory("Identity")).attach(investorIdentity);
    await agentManager.connect(otaSafe2).callRegisterIdentity(investor.address, investorIdentity, 1, otaSafe1IdAddr);

    let mintAmount = '1000000000000000000000';
    await expect(agentManager.connect(otaSafe2).callMint(investor.address, mintAmount, otaSafe1IdAddr)).to.be.revertedWith("Identity is not verified.");

    let dataString = await ethers.id("https://ipfs.org");
    // let data = await ethers.getBytes(dataString);
    // let preparedClaim = await web3.utils.keccak256(await ethers.AbiCoder.defaultAbiCoder().encode(['address', 'uint256', 'bytes'], [investorIdentity, 1, data]));
    let claimSignature = await kycClaimIssuer.signMessage(await ethers.getBytes(await ethers.keccak256(await ethers.AbiCoder.defaultAbiCoder().encode(['address', 'uint256', 'bytes'], [investorIdentity, 1, dataString]))));
    // let claimSignature = await kycClaimIssuer.signMessage(await ethers.keccak256(await ethers.AbiCoder.defaultAbiCoder().encode(['address', 'uint256', 'bytes'], [investorIdentity, 1, dataString])));

    await investorIdentityContract.connect(investor).addClaim(1, 1, claimIssuerIdentity.target, claimSignature, dataString, "https://ipfs.org");

    await agentManager.connect(otaSafe2).callMint(investor.address, mintAmount, otaSafe1IdAddr);

    await expect(await deployedToken.balanceOf(investor.address)).to.be.equal(mintAmount);

  });

  it("Deploy new TREXImplementationAuthority and link to token", async () => {
    await trexFactory.recoverContractOwnership((await deployedIdentityRegistry.identityStorage()), otaDeployer.address);
    await implementationAuth.changeImplementationAuthority(deployedToken.target, ethers.ZeroAddress);
  });

});
