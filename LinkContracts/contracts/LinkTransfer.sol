// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "https://github.com/Bhaney44/ChainLinkHackathonSpring2022/blob/main/TestNetLink/link.sol";

// Demo Contract to recieve and send out ERC-20 LINK (Goerli testnet)
// Functions like an escrow that interacts with another contract to recieve ETH or an ERC-20 and then withdraws/send out LINK 

contract Converter_Escrow is Chainlink {
    address public owner;
    uint256 public balance;
    
    event TransferReceived(address _from, uint _amount);
    event TransferSent(address _from, address _destAddr, uint _amount);
    
    constructor() {
        owner = msg.sender;
    }

    receive() payable external {
        balance += msg.value;
        emit TransferReceived(msg.sender, msg.value);
    }  

    
    function transferERC20(IERC20 token, address to, uint256 amount) public {
        require(msg.sender == owner, "Only owner can withdraw funds"); 
        uint256 LINKbalance = token.balanceOf(address(this));
        require(amount <= LINKbalance, "balance is low");
        token.transfer(to, amount);
        emit TransferSent(msg.sender, to, amount);
    }    
}
