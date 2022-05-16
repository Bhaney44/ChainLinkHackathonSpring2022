#Imports
from config import *
from algosdk.v2client import algod
from algosdk import account, mnemonic
from algosdk.future.transaction import write_to_file
from algosdk.future.transaction import AssetConfigTxn, AssetTransferTxn
from util import sign_and_send, balance_formatter

# Client
algod_address = "https://testnet-algorand.api.purestake.io/ps2"
#algod_address = "https://mainnet-algorand.api.purestake.io/ps2"
algod_token = ""
headers = {"X-API-Key": algod_token }
client = algod.AlgodClient(algod_token, algod_address, headers)

# Create Function
def create(passphrase=None):
	params = client.suggested_params()
	txn = AssetConfigTxn(creator_address, params, **asset_details)
	if passphrase:
		txinfo = sign_and_send(txn, passphrase, client)
		asset_id = txinfo.get('asset-index')
		print("Asset ID: {}".format(asset_id))
	else:
		write_to_file([txn], "create_coin.txn")

