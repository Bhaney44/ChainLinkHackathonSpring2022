# Apache License
from algosdk import account, encoding, mnemonic,algod
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn, AssetConfigTxn
from algosdk.future.transaction import AssetFreezeTxn
from algosdk.v2client import algod

algod_address = "https://testnet-algorand.api.purestake.io/ps2"
# algod_address = "https://mainnet-algorand.api.purestake.io/ps2"
algod_token = ""
headers = {"X-API-Key": "",}
algod_client = algod.AlgodClient(algod_token,algod_address,headers)

#Creator Information
creator_address = "" 
creator_mnemonic = "" 
creator_key = mnemonic.to_private_key(creator_mnemonic)

def link_mod():
	#TestNet
	#asset_id = 89483596
	asset_id = 743260106
	params = algod_client.suggested_params()
	transaction = AssetConfigTxn(creator_address, params, index = asset_id, manager = creator_address, reserve = creator_address, freeze = "", clawback = "", strict_empty_address_check = False)
	signature = transaction.sign(creator_key)
	algod_client.send_transaction(signature)
	transaction_id = transaction.get_txid()
	transaction_id = str(transaction_id)
	print("Your transaction information is at: " + transaction_id)
link_mod()