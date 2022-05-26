//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract ConverterResponse is ChainlinkClient {
  using Chainlink for Chainlink.Request;

  bytes public data;
  string public algo_address;
  uint256 public amount;
  
  constructor(
  ) {
    setChainlinkToken(0xa591AFBC1A81EA1c61edeFa3A36D54f50Ca05Cad);
    setChainlinkOracle(0x9f8f7c4dCF80Babff1081089F44A89619E82A211);
  }

  function requestAddressAndAmount(
  )
    public
  {
    bytes32 specId = "cc6f897a15734e49bc41f21fce26fd28";
    uint256 payment = 0;
    Chainlink.Request memory req = buildChainlinkRequest(specId, address(this), this.fulfillBytes.selector);
    req.add("eth_address", "0x4F03c13d9727AAF5ED7382F9A507b4109A5b23C6");
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

// https://rinkeby.etherscan.io/address/0x3954920b419b2998ce671b9d92097ca354907c10
