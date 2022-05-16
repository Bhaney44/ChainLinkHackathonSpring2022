#Creator Credentials
creator_address = "" 
creator_passphrase = "" 

#algod_address = "https://testnet-algorand.api.purestake.io/ps2"
algod_address = "https://mainnet-algorand.api.purestake.io/ps2"
algod_token = ""

# Details of the asset creation transaction.
asset_details = {
	"asset_name": "goLink",
	"unit_name": "LINK",
	"total": 1000000000000000,
	"decimals": 6,
	"default_frozen": False,
	"manager": creator_address,
	"reserve": creator_address,
	"freeze": creator_address,
	"clawback": creator_address,
	"url": "https://chain.link/",
	"metadata_hash": ""
}

metadata_file = "link.png"
metadatahash_b64 = b'szcRiszR7+XlAUH1ZsCtwzlhB+smx8cyy8GF37dp5aM='

#TestNet
#asset_id = 89483596
#MainNet
asset_id = 743260106






