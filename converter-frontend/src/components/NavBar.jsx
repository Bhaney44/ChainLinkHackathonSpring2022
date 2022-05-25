import algosdk from "algosdk";
import { ASSET_ID } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import img from '../assets/c.png';
import { CopyToClipboard } from "react-copy-to-clipboard";
import corect from '../assets/correct.png';
import {Link} from 'react-router-dom';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import {ethers} from 'ethers';


const NavBar = () => {
  const dispatch = useDispatch();

  const addressNum = useSelector((state) => state.status.addressNum);
  const isWalletConnected =
    localStorage.getItem("wallet-type") === null ? false : true;

  const [copyToClipBoard , setCopyToClipBoard] = useState(null)

    const handyCopyToClipBoard = () => {
      setCopyToClipBoard(true)
      setTimeout(() => {
        setCopyToClipBoard(false)
  
      }, 500);
    }

  const LogOut = () => {
    localStorage.removeItem("address");
    localStorage.removeItem("addresses");
    localStorage.removeItem("wallet-type");
    localStorage.removeItem("walletconnect");
    localStorage.removeItem("metaAddresses");
    localStorage.removeItem("metaAddress");
    window.location.reload();
    console.log("data");
  };

  const [balance, setBalance] = useState([]);

  const algodClient = new algosdk.Algodv2(
    {
      "X-API-Key": "", //your API key gotten from purestake API,
    },
    "https://testnet-algorand.api.purestake.io/ps2",
    ""
  );

  const walletAddress = localStorage.getItem("address");
  const eth_address = localStorage.getItem("metaAddress")
  const addresses = localStorage.getItem("addresses")?.split(",");

  let addrArr = [];
  

  useEffect(() => {
   if(walletAddress) {
    addresses?.forEach(async (item) => {
      const myAccountInfo = await algodClient.accountInformation(item).do();
      const bal =
        myAccountInfo.assets.find((element) => element["asset-id"] === ASSET_ID)
          ?.amount / 100000000;
        
        
     addrArr.push({ balance: !!bal ? bal : 0, address: item });


    
        dispatch({
          type: "getBalance",
          balance : addrArr
        })
      


      if (addrArr?.length === addresses?.length) {
        dispatch({
          type: "setAlgoAddress",
          addressIndex: 0,
          addr: addrArr[0]?.address,
        });
        setBalance(addrArr);
        // console.log(balance)
      }
    });
   } 
   else if(eth_address) {
      // Requesting balance method
      window.ethereum
      .request({ 
        method: "eth_getBalance", 
        params: [eth_address, "latest"] 
      })
      .then((bal) => {
         addrArr.push({
            balance : ethers.utils.formatEther(bal),
            address: eth_address
          })
        setBalance(addrArr)
        dispatch({
          type: "getBalance",
          balance : addrArr
        })
      })
   }
   



    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const myAlgoConnect = async () => {
    dispatch({
      type: "confirm_wallet",
      alertContent : "Connecting MyAlgo wallet"
    })

    const myAlgoWallet = new MyAlgoConnect({ shouldSelectOneAccount: false });

    try {
      const accounts = await myAlgoWallet.connect({
        shouldSelectOneAccount: true,
      });
       console.log(accounts, 'accounts')
      const addresses = accounts.map((item) => item?.address);
      const address = accounts[0].address;
      
      console.log(address, 'address')
      console.log(addresses, 'addresses')

      // close modal.
      localStorage.setItem("wallet-type", "my-algo");
      localStorage.setItem("address", address);
      localStorage.setItem("addresses", addresses);

      window.location.reload();
    } catch (error) {
      dispatch({
        type: "close_wallet"
      })

      dispatch({
        type: "alert_modal",
          alertContent:
            "Error occurred while connecting wallet, Try again later.",
      })
      console.log(error);
    }
  };

  const connectWallet = () => {
  
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });

    if (!connector.connected) {
   
      connector.createSession();
    
    }

    connector.on("connect", (error, payload) => {
      if (error) {
        dispatch({
          type: "confirm_wallet",
          alertContent : "Error Connecting Pera wallet"
        })
        setTimeout(() => {
          dispatch({
            type: "close_wallet"
          })
        }, 2000)
        throw error;
        
      }
          
        dispatch({
          type: "close_wallet"
        })
   

      const { accounts } = payload.params[0];

      const addresses = accounts.map((item) => item);
      const address = accounts[0];

      localStorage.setItem("wallet-type", "walletconnect");
      localStorage.setItem("address", address);
      localStorage.setItem("addresses", addresses);

      window.location.reload();
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        dispatch({
          type: "confirm_wallet",
          alertContent : "Error Connecting Pera wallet"
        })
        setTimeout(() => {
          dispatch({
            type: "close_wallet"
          })
        }, 2000)
        throw error;
      }

      const { accounts } = payload.params[0];

      const addresses = accounts.map((item) => item);
      const address = accounts[0];

      localStorage.setItem("wallet-type", "walletconnect");
      localStorage.setItem("address", address);
      localStorage.setItem("addresses", addresses);

      window.location.reload();
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        dispatch({
          type: "confirm_wallet",
          alertContent : "Error Connecting Pera wallet"
        })

        setTimeout(() => {
          dispatch({
            type: "close_wallet"
          })
        }, 2000)
  
        console.log(error);
      }
    });
  };

  const metamaskConnection = async ()=> {

    dispatch({
      type: "confirm_wallet",
      alertContent : "Connecting to metamask"
    })
      // Check if MetaMask is installed on user's browser
  if(window.ethereum) {
    const account = await window.ethereum.request({ method: "eth_requestAccounts"  });
    console.log(account, "accounts");

    const addresses = account
    const metaAddress = account[0];

    console.log(metaAddress, 'metaAddress');
    console.log(addresses, 'metaAddresses');

    localStorage.setItem("wallet-type", "metamask");
    localStorage.setItem("metaAddress", metaAddress);
    localStorage.setItem("metaAddresses", addresses);

    window.location.reload();
    
    // const chainId = await window.ethereum.request({ method: 'eth_chainId'});
   } else {
     // Show alert if Ethereum provider is not detected
     dispatch({
      type: "close_wallet"
    })

    dispatch({
      type: "alert_modal",
      alertContent: "Please Install MetaMask!",
    });
   }
 
  } 

  const algoSignerConnect = async () => {

    try {
      dispatch({
        type: "confirm_wallet",
        alertContent : "Connecting Algosigner wallet"
      })

      if (typeof window.AlgoSigner === "undefined") {
      
        dispatch({
          type: "confirm_wallet",
          alertContent : "ALgosigner is not set up yet."
        })
      setTimeout(() => {
        dispatch({
          type: "close_wallet"
        })
      }, 4000)
        window.open(
          "https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm",
          "_blank"
        );
      } else {
        await window.AlgoSigner.connect({
          ledger: "TestNet",
        });
        const accounts = await window.AlgoSigner.accounts({
          ledger: "TestNet",
        });

        const addresses = accounts.map((item) => item?.address);
        const address = accounts[0].address;
       

        // close modal.
        localStorage.setItem("wallet-type", "algosigner");
        localStorage.setItem("address", address);
        localStorage.setItem("addresses", addresses);

        window.location.reload();
      }
    } catch (error) {
      dispatch({
        type: "close_wallet"
      })

      dispatch({
        type: "alert_modal",
        alertContent: "AlgoSigner not set up yet!",
      });
    }
  };

  

  return (
    <header className="small_header">
      <div className="small_header_inn">
        <Link to='/' 
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "uppercase",
          }}
        >
          <img src="https://i.postimg.cc/C5646St8/c.png" style={{width: "35px"}} alt="logo" />
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!!isWalletConnected? (
            <>
              <div className="addrDisplay">
                <div className="addrDispMain">
                  <div className="addrDisplayInn">
                    <div className="addrBalance">
                    {balance[addressNum]?.balance.toLocaleString()} <img src={img} style={{width : '13px', marginTop : '0px', marginLeft : '2px'}} alt="chain logo"/>
                    </div>

                    <CopyToClipboard text={balance[addressNum]?.address}>
                      <div className="addressTxt">
                        <p>{balance[addressNum]?.address}</p>
                        {copyToClipBoard ? (<img style={{width:'11px'}}
                          src={corect} alt="check"/>) : (<i onClick={() => handyCopyToClipBoard()} className="uil uil-copy"></i>)}
                        
                      </div>
                    </CopyToClipboard>
                  </div>
                </div>

                <div className="dropDownConnect_items">
                  {balance?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="dropDownConnect_item"
                        onClick={() => {
                          dispatch({
                            type: "setAlgoAddress",
                            addressIndex: index,
                            addr: item.address,
                          });
                        }}
                      >
                        <p className="dropDownConnect_item_txt">
                          {item.address}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="dropDownConnect">
              <div className="dropDownConnect_button">
                <button className="connect_wallet_button">
                  <p>
                    Connect Wallet
                    <i
                      className="uil uil-angle-down"
                      style={{ fontSize: "18px" }}
                    />
                  </p>
                </button>
              </div>

              <div className="dropDownConnect_items">
                <div className="dropDownConnect_item" onClick={myAlgoConnect}>
                  <div className="dropDownConnect_img">
                    <img
                      src="https://i.postimg.cc/76r9kXSr/My-Algo-Logo-4c21daa4.png"
                      alt=""
                    />
                  </div>
                  <p className="dropDownConnect_item_txt">My Algo Wallet</p>
                </div>
                <div
                  className="dropDownConnect_item"
                  onClick={metamaskConnection}
                >
                  <div className="dropDownConnect_img">
                    <img
                      src="https://i.postimg.cc/zGQ3QnH6/meta.png"
                      alt=""
                    />
                  </div>
                  <p className="dropDownConnect_item_txt">
                   MetaMask
                  </p>
                </div>

                <div
                  className="dropDownConnect_item"
                  onClick={algoSignerConnect}
                >
                  <div className="dropDownConnect_img">
                    <img
                      src="https://i.postimg.cc/L4JB4JwT/Algo-Signer-2ec35000.png"
                      alt=""
                    />
                  </div>
                  <p className="dropDownConnect_item_txt">
                    {typeof window.AlgoSigner === undefined
                      ? "Install AlgoSigner"
                      : "AlgoSigner"}
                  </p>
                </div>

                <div className="dropDownConnect_item" onClick={connectWallet}>
                  <div className="dropDownConnect_img">
                    <img
                      src="https://i.postimg.cc/QdXmHSYZ/pera.png"
                      alt=""
                    />
                  </div>
                  <p className="dropDownConnect_item_txt">
                    Pera Wallet
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

     
      <p className="disconnect" style={{color: 'red', }} onClick={LogOut}> <span className={ isWalletConnected ? "disconnect_button" : null} style={{cursor : "pointer"}}>{isWalletConnected ? "Disconnect ☎️" : null}</span></p>
     
    
    </header>
  );
};

export default NavBar;
