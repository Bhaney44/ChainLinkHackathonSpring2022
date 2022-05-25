// Copyright Brian Haney, Samuel Tosin, David Kazeem, and Eugene Nnamdi 2022
// Apache License
// Backend architecture prototyping

// Purpose
// The goal here is to build a smart contract that sends assets based on two parameters.
// The first parameter is a user entered address.
// The second parameter is a user entered amount.
// This pseudocode is intended for logical development only.
// This pseudocode is not intended for use or deployment.

// Software version
pragma solidity 0.8.7;

// Logic for contract zero
/////////////////////////////////
contract Converter_Zero{
    address payable reciever;
    unit public amount = 0
    modifier reciever(address){
        address payable reciever
    }
    modifier amount(unit){
        unit public amount
    }
    function convert() {
        address payable reciever;
        unit public amount = amount
    }

}
/////////////////////////////////

// Logic for contract one
/////////////////////////////////
contract Converter_One{
    // Reciever and amount variables
    reciever = user_address_entry
    amount = user_amount_entry
    // Sends assets
    function send(address receiver, uint amount) public {
        if (amount > balances[msg.sender])
            revert InsufficientBalance({
                requested: amount,
                available: balances[msg.sender]
            });
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
/////////////////////////////////
