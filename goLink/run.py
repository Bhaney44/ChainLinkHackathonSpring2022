#Copyright Brian Haney 2022

# Imports
import util
import main
import config

## Hash image
from util import hash_file_data
x = hash_file_data('link.png')
y = hash_file_data('link.png', 'base64')
print(x)
print(y)

## Create Asset
from main import create
from config import creator_passphrase
create(creator_passphrase)
