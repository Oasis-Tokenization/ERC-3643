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

async function main () {
    const [deployer] = await ethers.getSigners();

    const GATEWAY = await ethers.getContractFactory("Gateway");
    let gateway = await GATEWAY.attach(process.env.POLYGON_GATEWAY);
    let estGas = await gateway.deployIdentityForWallet.estimateGas(process.env.IDFOR);
    const TX = await gateway.deployIdentityForWallet(process.env.ADDR, {gasLimit: estGas * BigInt(2)});
    let receipt = await TX.wait();
    await sleep(5000);
    console.log('ID DEPLOYED : ', receipt);
    let identityAddr = await getIdAddressFromTx(receipt, process.env.POLYGON_IDFACTORY, process.env.ADDR);
    console.log("Identity address : ", identityAddr);

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });