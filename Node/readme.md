# Chainlink node data validation

This directory is for files relating to validating Algorand data on the Ethereum blockchain.
The validation process utilizes a Chainlink node to inform a smart contract for asset conversion.

We tapped the block-farms.io Chainlink node service which can connect any private or public, premium or free API endpoint and securely host the external adapter that our smart contract requires.

The Chainlink node service enables us to tap data that the smart contract requires to process a payment.

``` curl -X POST -H "Content-type: application/json" -d '{"eth_address":"0x2f318C334780961FB129D2a6c30D0763d9a5C340"}' 'https://chainlink-backend.herokuapp.com/explorer/transaction' ```

The data from this curl request is made available to the Smart Contract.

```
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract GenericLargeResponse is ChainlinkClient {
  using Chainlink for Chainlink.Request;


  bytes public data;
  string public algo_address;
  uint256 public amount;
  
  constructor(
  ) {
    setChainlinkToken(0x01BE23585060835E02B77ef475b0Cc51aA1e0709);
    setChainlinkOracle(0x9f8f7c4dCF80Babff1081089F44A89619E82A211);
  }


  function requestAddressAndAmount(
  )
    public
  {
    bytes32 specId = "cc6f897a15734e49bc41f21fce26fd28";
    uint256 payment = 0;
    Chainlink.Request memory req = buildChainlinkRequest(specId, address(this), this.fulfillBytes.selector);
    req.add("eth_address", "0x2f318C334780961FB129D2a6c30D0763d9a5C340");
    sendOperatorRequest(req, payment);
  }

  event RequestFulfilled(
    bytes32 indexed requestId,
    bytes indexed data,
    uint256 amount
  );


  function fulfillBytes(
    bytes32 requestId,
    bytes memory bytesData,
    uint256 _amount
  )
    public
    recordChainlinkFulfillment(requestId)
  {
    emit RequestFulfilled(requestId, bytesData, _amount);
    data = bytesData;
    algo_address = string(data);
    amount = _amount;
  }

} 
```
