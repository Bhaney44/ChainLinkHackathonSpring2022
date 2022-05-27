# Chainlink Converter

<img width="512" alt="Screen Shot 2022-05-26 at 4 48 26 PM" src="https://user-images.githubusercontent.com/43055154/170601839-2a4a5558-b2df-41a4-9bb5-ff162adb3969.png">

# Overview

Linking blockchains is a hard problem, with a great solution – Chainlink. Chainlink is a series of Decentralized Oracle Networks (DONs), which are information systems maintained by a committee of nodes.[[1]](https://chain.link/whitepaper)  DONs act as powerful abstraction layers, offering interfaces for smart contracts, and decentralized off-chain computing resources.  Building with Chainlink, this Project provides a new solution to the interoperability problem, which refers to the ability of blockchains to seamlessly integrate with one another.

View our [Demo on YouTube](https://www.youtube.com/watch?v=OnU8OtDLYEA). Repository made for the Spring 2022 [ChainLink Hackathon](https://chain.link/hackathon). Hackathon White Paper available on [GitHub](https://github.com/Bhaney44/ChainLinkHackathonSpring2022) and [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4116942).

# Problem
How do we create an interchain protocol between Ethereum and Algorand? The problem requires using a Chainlink node for data control, allowing for interchain data transmission, validation, and processing. Additionally, the problem requires creating a collatoral form of LINK on Algorand to allow for cross chain conversions. The collatoralized LINK will allow Chainlink smart contracts to recieve data from Algorand enabling Chainlink smart contracts to use Algorand data in automating asset distributions on Ethereum.

# Solution
<img width="762" alt="Screen Shot 2022-05-25 at 1 28 12 AM" src="https://user-images.githubusercontent.com/43055154/170217565-e2babe0f-6404-4c54-87d7-f5464e1c0f08.png">

Invent a converter for Algorand and Ethereum using Chainlink. The converter will allow interoperability between the two blockchains. A keystone to the converter is goLink. goLink allows for LINK transactions on the Algorand blockcahin, while the Chainlink Converter allows for asset movement between the Algorand and Ethereum blockchains. The Converter processes data from the Algorand blockchain which is sent to a Chainlink node for validation and then processed by a smart contract for on-chain distribution of LINK on Ethereum. Thus, Chainlink allows for the converter to operate in bi-lateral fashion, from Ethereum to Algorand and visa versa. As such, the Chainlink Converter strives to solve the interoperability problem between Algorand and Ethereum for Chainlink. 

# goLink

The token goLink is validated LINK on Algorand. We launched goLink on both the Algorand MainNet and TestNet.

[Algorand MainNet goLink](https://algoexplorer.io/asset/743260106) | [Algorand TestNet goLink](https://testnet.algoexplorer.io/asset/89483596)

LINK Logo added to Algorand Network via [Pull Request #465](https://github.com/tinymanorg/asa-list/pull/465).

<img width="521" alt="Screen Shot 2022-05-25 at 9 25 23 AM" src="https://user-images.githubusercontent.com/43055154/170313104-31a6f15e-0cee-4279-bc55-c68b63ebd9b6.png">

# Value

Chainklink Converters is designed to create value in DeFi and for DAOs through a software as a service model. For DeFi, creating interoperable systems helps projects grow their asset value with interoperable capability and by creating opportunity for cross chain arbitrage bots to improve market efficiencies across networks. For DAOs, the Converter allows for L2 DAOs to grow beyong a single blockchain which creates value through diversification and functional capabilities. For example, a DAO may wish to leverage DeFi on Ethereum, but choose to use Algorand for governance given the different offerings of the L1 blockchains. Our interchain software services using the Chainlink Converter may be made open to the public, or reserved for specific DeFi or DAO clientele. 

# Contributors
- [Samuel Tosin](https://github.com/samuellyworld)
- [David Kazeem](https://github.com/davonjagah)
- [Brian Haney](https://github.com/bhaney44)
- [Eugene Nnamdi](https://github.com/eugenennamdi)

# Developer Resources
[Chainlink: Deploy Your First Smart Contract](https://docs.chain.link/docs/deploy-your-first-contract/)

[Chainlink: Consuming Data Feeds](https://docs.chain.link/docs/consuming-data-feeds/)

[Chainlink: Getting Help](https://docs.chain.link/docs/getting-help/)

[Chainlink: Acquire testnet LINK](https://docs.chain.link/docs/acquire-link/)

[Chainlink: Running a Chainlink Node](https://docs.chain.link/docs/running-a-chainlink-node/)

[Chainlink: Fullfilling Requests](https://docs.chain.link/docs/fulfilling-requests/)

[Chainlink: Configuring Chainlink Nodes](https://docs.chain.link/docs/configuration-variables/)

[Chainlink: Building External Adapters](https://docs.chain.link/docs/developers/)

[Chainlink: Bridges: Adding External Adapters to Nodes](https://docs.chain.link/docs/node-operators/)

[Chainlink: Webhook Jobs](https://docs.chain.link/docs/jobs/types/webhook/)

[Chainlink: Building and Using External Adapters](https://blog.chain.link/build-and-use-external-adapters/)

[Open Zeppelin: ERC 20](https://docs.openzeppelin.com/contracts/4.x/erc20)

[Algorand: Create your Own Coin on TestNet](https://developer.algorand.org/tutorials/create-laylacoin/)

[Algorand: Py-Algorand-SDK](https://github.com/algorand/py-algorand-sdk)

[Algorand: Js-Algorand-SDK](https://github.com/algorand/js-algorand-sdk)

