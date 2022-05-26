// SPDX-License-Identifier: Apache2.0
pragma solidity ^0.8.0;

// *
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";


contract Converter is ERC20{

    // Source account that sends Link to recipient 
    address payable sourceAccount;

    // Ethereum address of user  
    address payable[] public recipient;

    // variable to temporarily store amount of goLink to be sent
    uint public amount;

    // constructor to initialize params... 
    constructor (address recipient, uint amount){
        sourceAccount = payable(msg.sender);
        recipient = recipient;
        amount = 0;

}

    /// modifier to allow sourceAccount own some methods
    modifier onlyOwner() {
      require(msg.sender == sourceAccount);
      _;
    }


    /// function that sends goLink to the address(recipient)
    
    function transferFrom(address sourceAccount, address recipient, uint amount) public virtual override returns (bool) {
        address sourceAccount = _msgSender();
        _transfer(sourceAccount, recipient, amount);
        return true;
    }
}
