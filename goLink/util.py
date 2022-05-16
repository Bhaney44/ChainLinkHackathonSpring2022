# Imports
import hashlib
import base64
import algosdk
from algosdk import account, mnemonic

def hash_file_data(filename, return_type="bytes"):
	filebytes = open(filename, 'rb').read()
	h = hashlib.sha256()
	h.update(filebytes)
	if return_type == "bytes":
		return h.digest()
	elif return_type == "base64":
		return base64.b64encode(h.digest())

def sign_and_send(txn, passphrase, client):
	private_key = mnemonic.to_private_key(passphrase)
	stxn = txn.sign(private_key)
	txid = stxn.transaction.get_txid()
	client.send_transaction(stxn)
	wait_for_confirmation(client, txid, 5)
	print('Confirmed TXID: {}'.format(txid))
	txinfo = client.pending_transaction_info(txid)
	return txinfo
