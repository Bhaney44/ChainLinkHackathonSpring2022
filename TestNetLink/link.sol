// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.6.0/token/ERC20/ERC20.sol";

contract Chainlink is ERC20 {
    constructor() ERC20("Chainlink", "LINK") {
        _mint(msg.sender, 10000000000000000000000000000);
    }
}
