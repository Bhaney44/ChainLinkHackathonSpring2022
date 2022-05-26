import dotenv from 'dotenv';
import web3 from 'web3';

import {createAlchemyWeb3} from "@alch/alchemy-web3";
dotenv.config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const Web3 = createAlchemyWeb3(alchemyKey);

const contractAddress = web3.utils.toChecksumAddress("0x60aEe66253dD486Cf24EecA0F9B0cF03Ce18559a");

console.log('Alchemy Key - ' + alchemyKey)
console.log('Contract Address - ' + contractAddress)
const contractABI = require('../contract-ABI/chainlink.json');

export const smartContract = new Web3.eth.Contract(
    contractABI,
    contractAddress
  );



  export const getAccountBalance = async (address) => {
    //input error handling
    if (!window.ethereum || address === null) {
      return {
        status:
          "💡 Connect your Metamask wallet to update the message on the blockchain.",
      };
    }
  
    const message = await smartContract.methods.balances(address).call();
    return message;
  
  };

  export const transferBalance = async (address, transferAddress, amount) => {
    //input error handling
    if (!window.ethereum || address === null || transferAddress === null) {
      return {
        status:
          "💡 Connect your Metamask wallet to update the message on the blockchain.",
      };
    }
  
    //set up transaction parameters
    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: address, // must match user's active address.
      data: smartContract.methods.transfer(transferAddress, amount).encodeABI(),
    };
  
    //sign the transaction
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
    } catch (error) {
      return {
        status: "😥 " + error.message,
      };
    }
  };