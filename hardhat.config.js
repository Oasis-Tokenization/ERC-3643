require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-truffle5');
require("@nomiclabs/hardhat-web3");
// require("hardhat-contract-sizer");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // contractSizer: {
  //   alphaSort: false,
  //   disambiguatePaths: true,
  //   runOnCompile: true,
  //   strict: false,
  //   only:['']
  // },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,      
    },
    mumbaitest: {
      url: `${process.env.MUMBAI_URL}`,
      accounts:[`0x${process.env.PVTKEY}`],
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    avaxtest:{
      url: `${process.env.AVAXTEST_URL}`,
      accounts:[`0x${process.env.PVTKEY}`],
    },
    goerlitest:{
      url: `${process.env.GOERLI_URL}`,
      accounts:[`0x${process.env.PVTKEY}`],

    },
  },
  etherscan: {
    apiKey: {
      goerli:`${process.env.ETH_API}`,
      sepolia: `${process.env.ETH_API}`,
      avalancheFujiTestnet: `${process.env.AVAX_API}`,
      polygonMumbai: `${process.env.MUMBAI_API}`,
      optimisticGoerli: `${process.env.OPT_API}`
    }
  },
};
