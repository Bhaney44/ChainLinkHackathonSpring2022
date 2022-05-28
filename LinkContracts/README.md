## Directory for LINK Smart Contracts

&nbsp;

### Overview On Smart Contracts

A smart contract is a new type of technology at the confluence of contracts and blockchains. The term "smart contract" is defined in wide variance among blockchain developers and professionals. For example, the Founder of Ethereum, Vitalik Buterin defines smart contract as, “systems which automatically move digital assets according to arbitrary pre-specified rules.”[1](https://ethereum.org/en/whitepaper/) Another example, the former MIT professor and current Commissioner of the SEC Gary Gensler, adopts Nick Szabo’s definition of smart contract, “A set of promises, specified in digital form, including protocols within which the parties perform on these promises.”[2](https://ocw.mit.edu/courses/15-s12-blockchain-and-money-fall-2018/resources/session-6-smart-contracts-and-dapps/)

&nbsp;

### Outline on LINK Contracts

This repository includes Chainlink Smart Contracts used in the development of the Chainlink Converter.

 - The  [main smart contract](https://github.com/Bhaney44/ChainLinkHackathonSpring2022/blob/main/LinkContracts/contracts/ChainlinkContract.sol) for the converter validates data from Algorand on Ethereum and is processed using a Chainlink node.
![Screenshot (16)](https://user-images.githubusercontent.com/85407620/170778488-7b165cc1-91e5-4f0c-b109-edff2092ffdf.png)

 - The node validates the data generating a Decentralized Oralcle Network link Algorand and Ethereum through Chainlink.

 - Using an interactable [LinkTransfer Contract](https://github.com/Bhaney44/ChainLinkHackathonSpring2022/blob/main/LinkContracts/contracts/LinkTransfer.sol) that can inherit from the [TestNet Link On Rinkeby](https://github.com/Bhaney44/ChainLinkHackathonSpring2022/blob/main/TestNetLink/link.sol), we can also transfer LINK to the address recieved from the [main smart contract](https://github.com/Bhaney44/ChainLinkHackathonSpring2022/blob/main/LinkContracts/contracts/ChainlinkContract.sol)
 - ![Screenshot (17)](https://user-images.githubusercontent.com/85407620/170778849-f0bd1910-b268-46ef-b9fe-70ed6d7b4890.png)

&nbsp;

### Files Used
 - [ChainlinkContract.sol](https://github.com/Bhaney44/ChainLinkHackathonSpring2022/blob/main/LinkContracts/contracts/ChainlinkContract.sol)
 - [ChainlinkContract_flat.sol](https://github.com/Bhaney44/ChainLinkHackathonSpring2022/blob/main/LinkContracts/contracts/ChainlinkContract_flat.sol)
 - [LinkTransfer.sol](https://github.com/Bhaney44/ChainLinkHackathonSpring2022/blob/main/LinkContracts/contracts/LinkTransfer.sol)
&nbsp;

### LINK CONTRACT VERIFIED ON [RINKEBY TEST NETWORK](https://rinkeby.etherscan.io/address/0x334cdcf3cc39cf0d84d6adb10961400fe204f8bc)
&nbsp;

### Liscense
 - [MIT](https://spdx.org/licenses/MIT.html)
