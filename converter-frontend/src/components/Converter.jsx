import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import WalletConnect from "@walletconnect/client"; 
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import axios from 'axios';
import algosdk from "algosdk";
import "../styles/converter.css";
import { transferBalance } from "../utils/contract-interact";


const Converter = () => {
  // algod Client
  const algod_token = {
    "X-API-Key": "AE6Ave7wNH8bKB1SiwutOakoTHreBlWZ9TMKElZs"
  }
  const algod_address = "https://testnet-algorand.api.purestake.io/ps2";
  const headers = "";

  const algodClient = new algosdk.Algodv2(algod_token, algod_address, headers);
  const walletType = localStorage.getItem("wallet-type");
  const isWalletConnected =
  localStorage.getItem("wallet-type") === null ? false : true;
  const isThereAddress = localStorage.getItem("address");
  const eth_address = localStorage.getItem("metaAddress");
  const algoConverterAddress = "FJJ7FFJ4ZPIKTB2VN3ZM6HX4IBFIUVIEKQCMMSSPXVOPFB57XOT4OF6C5Y";
  const ethereumConverterAddress = "0x4F03c13d9727AAF5ED7382F9A507b4109A5b23C6"

  // const myAlgoWallet = new MyAlgoConnect();
  const ASSET_ID = 89483596;


  // wallet-type & address
  // const walletType = localStorage.getItem("wallet-type");
  // const walletAddress = localStorage.getItem("address");

  const dispatch = useDispatch();
  const [addressForConverter, setAddressForConverter] = useState("");
  const [amountToConvert, setAmountToConvert] = useState("");
  const [algoToSend, setalgoToSend] = useState(undefined);

const myAlgoSign = async () => {
  const myAlgoWallet = new MyAlgoConnect({ shouldSelectOneAccount: false })
  try {
    const address = !!isThereAddress && isThereAddress 
    const myAccountInfo = await algodClient
    .accountInformation(
      !!isThereAddress && isThereAddress 
    )
    .do();
 
   // check if the user has goLink opted-in
    const containsGoLink = myAccountInfo.assets
    ? myAccountInfo.assets.some(
        (element) => element["asset-id"] === ASSET_ID
      )
    : false;

    // if the address has no ASAs
   if (myAccountInfo.assets.length === 0) {
         dispatch({
            type: "alert_modal",
            alertContent:
              "You need to opt-in to $goLink in your Algorand Wallet to make conversion.",
          });
          return;
        }
   if (!containsGoLink) {
       dispatch({
            type: "alert_modal",
            alertContent:
              "You need to opt-in to $goLink in your Algorand Wallet to make conversion..",
          });
          return;
        }    
      //get goLink balance
   const balance = myAccountInfo.assets
   ? myAccountInfo.assets.find(
       (element) => element["asset-id"] === ASSET_ID
     ).amount / 1000000
   : 0;
    
      //get algo balance of the user
  const algoBalance = myAccountInfo.amount/1000000;
  if(algoBalance < algoToSend) {
    dispatch({
      type: "alert_modal",
      alertContent:
        "You do not have sufficient fee to make conversion.",
    });
    return;
  }
  
  if ( amountToConvert > balance) {
      dispatch({
            type: "alert_modal",
            alertContent:
              "You do not have sufficient balance in $goLink to make this transaction.",
          });
          return;
        }

        dispatch({
          type: "confirm_wallet",
          alertContent : "Confirming goLink Transaction"
        })

          const suggestedParams = await algodClient.getTransactionParams().do();
      
          const amountToSend = amountToConvert * 1000000;
          const amountInAlgo = algoToSend * 1000000;
      
          const txn1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: address,
            to: algoConverterAddress,
            amount: amountToSend,
            assetIndex: ASSET_ID,
            suggestedParams,
          });
    
          const tnx2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: address,
            to: algoConverterAddress,
            amount : amountInAlgo,
            suggestedParams,
          })

          let txns = [txn1, tnx2]
          algosdk.assignGroupID(txns);
   
         let Txns = [txn1.toByte(), tnx2.toByte()]
   
         
   
         const signedTxn = await myAlgoWallet.signTransaction(Txns);
         const SignedTx = signedTxn.map((txn) => {
           return txn.blob;
         });
         const resp = await algodClient.sendRawTransaction(SignedTx).do();
         dispatch({
          type: "close_wallet"
        }) 

         if(resp) {
          const headers  =  {'Content-Type': 'application/json'} 
         await  axios.post('https://chainlink-backend.herokuapp.com/explorer/post', {
            eth_address : addressForConverter,
            algo_address : address,
            amount : amountToConvert,
            pending : true,
             
          }, {headers }).then(response => {
            console.log(response)
          },(err) => {
            console.log(err)
          } )
        }
        
          // alert success
      dispatch({
        type: "alert_modal",
        alertContent: "goLink is being converted to Link,  Check explorer page for confirmation.",
      });
      setTimeout(() => window.location.reload(), 1500);

  } catch(error){
    if (error.message === "Can not open popup window - blocked") {
      dispatch({
        type: "close_wallet"
      }) 
      dispatch({
        type: "alert_modal",
        alertContent:
          "Pop Up windows blocked by your browser. Enable pop ups to continue.",
      });
    } else {
      console.log(error)
      dispatch({
        type: "close_wallet"
      }) 

      dispatch({
        type: "alert_modal",
        alertContent: "An error occured the during transaction process",
      });
    }
  
  }
}

const algoSignerConnect = async () => {
  try {
    const address = !!isThereAddress && isThereAddress 

    const myAccountInfo = await algodClient
      .accountInformation(
        !!isThereAddress && isThereAddress
      )
      .do();

       // check if the user has goLink opted-in
       const containsGoLink = myAccountInfo.assets
       ? myAccountInfo.assets.some(
           (element) => element["asset-id"] === ASSET_ID
         )
       : false;
   
       // if the address has no ASAs
      if (myAccountInfo.assets.length === 0) {
            dispatch({
               type: "alert_modal",
               alertContent:
                 "You need to opt-in to $goLink in your Algorand Wallet to make conversion.",
             });
             return;
           }
      if (!containsGoLink) {
          dispatch({
               type: "alert_modal",
               alertContent:
                 "You need to opt-in to $goLink in your Algorand Wallet to make conversion..",
             });
             return;
           }    
         //get goLink balance
      const balance = myAccountInfo.assets
      ? myAccountInfo.assets.find(
          (element) => element["asset-id"] === ASSET_ID
        ).amount / 1000000
      : 0;
       
         //get algo balance of the user
     const algoBalance = myAccountInfo.amount/1000000;
     if(algoBalance < algoToSend) {
       dispatch({
         type: "alert_modal",
         alertContent:
           "You do not have sufficient algo fee to make conversion.",
       });
       return;
     }
     
     if ( amountToConvert > balance) {
       dispatch({
          type: "alert_modal",
           alertContent:
            "You do not have sufficient balance in $goLink to make this transaction.",
           });
         return;
           }
   
      dispatch({
          type: "confirm_wallet",
          alertContent : "Confirming goLink Transaction"
           })
      const suggestedParams = await algodClient.getTransactionParams().do();
      const amountToSend = amountToConvert * 1000000;
       const amountInAlgo = algoToSend * 1000000; 

      const txn1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: address,
            to: algoConverterAddress,
            amount: amountToSend,
            assetIndex: ASSET_ID,
            suggestedParams,
          });
  
      const txn2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: address,
            to: algoConverterAddress,
            amount : amountInAlgo,
            suggestedParams,
          })
      let txns = [txn1, txn2]
      algosdk.assignGroupID(txns);
  
       let Txns = []
          // eslint-disable-next-line
       txns.map((transaction) => {
            Txns.push({
              txn: window.AlgoSigner.encoding.msgpackToBase64(transaction.toByte()),
            });
          })
  
  
      const signedTxn = await window.AlgoSigner.signTxn(Txns);
  
      const SignedTx = signedTxn.map((txn) => {
            return  window.AlgoSigner.encoding.base64ToMsgpack(txn.blob);
          });
       
  
       const resp = await algodClient
            .sendRawTransaction(SignedTx).do();

       dispatch({
              type: "close_wallet"
            }) 
       if(resp) {
            const headers  =  {'Content-Type': 'application/json'} 
        await  axios.post('https://chainlink-backend.herokuapp.com/explorer/post', {
                eth_address : addressForConverter,
                algo_address : address,
                amount : amountToConvert,
                pending : true,
                 
              }, {headers }).then(response => {
                console.log(response)
              },(err) => {
                console.log(err)
              } )
            }   
            // alert success
      dispatch({
        type: "alert_modal",
        alertContent: "goLink is being converted to Link,  Check explorer page for confirmation.",
      });
      setTimeout(() => window.location.reload(), 1500);


  } catch(error) {
    if (error.message === "Can not open popup window - blocked") {
      dispatch({
        type: "close_wallet"
      }) 
      dispatch({
        type: "alert_modal",
        alertContent:
          "Pop Up windows blocked by your browser. Enable pop ups to continue.",
      });
    } else {
      console.log(error);
      dispatch({
        type: "close_wallet"
      }) 
      dispatch({
        type: "alert_modal",
        alertContent: "An error occured the during transaction process",
      });
    }
  
  }
}

const peraAlgoWalletSign = async () => {
  const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: QRCodeModal,
  });

  try {
    const address = !!isThereAddress && isThereAddress 

    const myAccountInfo = await algodClient
      .accountInformation(
        !!isThereAddress && isThereAddress
      )
      .do();

       // check if the user has goLink opted-in
       const containsGoLink = myAccountInfo.assets
       ? myAccountInfo.assets.some(
           (element) => element["asset-id"] === ASSET_ID
         )
       : false;
   
       // if the address has no ASAs
      if (myAccountInfo.assets.length === 0) {
            dispatch({
               type: "alert_modal",
               alertContent:
                 "You need to opt-in to $goLink in your Algorand Wallet to make conversion.",
             });
             return;
           }
      if (!containsGoLink) {
          dispatch({
               type: "alert_modal",
               alertContent:
                 "You need to opt-in to $goLink in your Algorand Wallet to make conversion..",
             });
             return;
           }    
         //get goLink balance
      const balance = myAccountInfo.assets
      ? myAccountInfo.assets.find(
          (element) => element["asset-id"] === ASSET_ID
        ).amount / 1000000
      : 0;
       
         //get algo balance of the user
     const algoBalance = myAccountInfo.amount/1000000;
     if(algoBalance < algoToSend) {
       dispatch({
         type: "alert_modal",
         alertContent:
           "You do not have sufficient algo fee to make conversion.",
       });
       return;
     }
     
     if ( amountToConvert > balance) {
       dispatch({
          type: "alert_modal",
           alertContent:
            "You do not have sufficient balance in $goLink to make this transaction.",
           });
         return;
           }
   
      dispatch({
          type: "confirm_wallet",
          alertContent : "Confirming goLink Transaction"
           })

      const suggestedParams = await algodClient.getTransactionParams().do();
      const amountToSend = amountToConvert * 1000000;
       const amountInAlgo = algoToSend * 1000000; 
       const txn1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: address,
        to: algoConverterAddress,
        amount: amountToSend,
        assetIndex: ASSET_ID,
        suggestedParams,
        
      });

      const txn2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: address,
        to: algoConverterAddress,
        amount : amountInAlgo,
        suggestedParams,
      })
      let txns = [txn1, txn2]
      algosdk.assignGroupID(txns);
      let Txns = []

      // eslint-disable-next-line
      txns.map((transaction) => {

        Txns.push({
          txn: Buffer.from(algosdk.encodeUnsignedTransaction(transaction)).toString(
            "base64"
          ),
          message: "Transaction using Mobile Wallet",
        })
      })


      const requestParams = [Txns];

      const request = formatJsonRpcRequest("algo_signTxn", requestParams);
      const result = await connector.sendCustomRequest(request);

      const decodedResult = result.map((element) => {
        return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
      });

   
    const resp = await algodClient.sendRawTransaction(decodedResult).do();
    dispatch({
      type: "close_wallet"
    }) 

     if(resp) {
      const headers  =  {'Content-Type': 'application/json'} 
     await  axios.post('https://chainlink-backend.herokuapp.com/explorer/post', {
        eth_address : addressForConverter,
        algo_address : address,
        amount : amountToConvert,
        pending : true,
         
      }, {headers }).then(response => {
        console.log(response)
      },(err) => {
        console.log(err)
      } )
    }
    
      // alert success
  dispatch({
    type: "alert_modal",
    alertContent: "goLink is being converted to Link,  Check explorer page for confirmation.",
  });
  setTimeout(() => window.location.reload(), 1500);
      } catch(error) {
        if (error.message === "Can not open popup window - blocked") {
          dispatch({
            type: "close_wallet"
          }) 
          dispatch({
            type: "alert_modal",
            alertContent:
              "Pop Up windows blocked by your browser. Enable pop ups to continue.",
          });
        } else {
          console.log(error)
          dispatch({
            type: "close_wallet"
          }) 
    
          dispatch({
            type: "alert_modal",
            alertContent: "An error occured the during transaction process",
          });
        }
        }

}

const metamaskSign = async () => {
  dispatch({
    type: "confirm_wallet",
    alertContent : "Confirming Transaction In MetaMask.."
     })

  try {
    const amount = `${amountToConvert * 10**18}`
    const headers  =  {'Content-Type': 'application/json'} 
     await transferBalance (eth_address, ethereumConverterAddress, amount)
  
    await  axios.post('https://chainlink-backend.herokuapp.com/explorer/post', {
      eth_address : eth_address,
      algo_address : addressForConverter,
      amount : amountToConvert,
      pending : true,
       
    }, {headers }).then(response => {
      console.log(response)
    },(err) => {
      dispatch({
        type: "close_wallet"
      }) 

      dispatch({
        type: "alert_modal",
        alertContent: "An error occured the during posting transaction",
      });
      console.log(err)
    } )
   

     dispatch({
       type: "alert_modal",
       alertContent: "Link is being converted to goLink,  Check explorer page for confirmation.",
     });
     setTimeout(() => window.location.reload(), 1500);

  } catch(error){
    dispatch({
      type: "close_wallet"
    }) 

    dispatch({
      type: "alert_modal",
      alertContent: "An error occured the during transaction process",
    });
  }
  
}

// converter function
const convert = () => {

  if(!isWalletConnected) {
    dispatch({
      type: "alert_modal",
      alertContent: "Kindly Connect Wallet To Make Conversion.",
    });
    return;
  }
  if(!addressForConverter) {
    dispatch({
      type: "alert_modal",
      alertContent: "Please Provide Address to Facilitate Conversion.",
    });
    return;
  }
  if(!amountToConvert) {
    dispatch({
      type: "alert_modal",
      alertContent: "Enter Amount To Convert",
    });
    return;
  }
  
  if(isThereAddress && !algoToSend) {
    dispatch({
      type: "alert_modal",
      alertContent: "You have To Accept Terms & Conditions Before Making Conversion",
    });
    return;
  }
    
  if (walletType === "my-algo") {
    myAlgoSign();
  }
   else if (walletType === "algosigner") {
    algoSignerConnect();
  } 
  else if (walletType === "walletconnect") {
    peraAlgoWalletSign();
  } 
  else if(walletType === "metamask") {
    metamaskSign();
  }
 
}
  

  return (
    <div className="create_elt">
      <div className="create_elt_inn">
        <div className="crt_hd">
          <p>Link Converter</p>
        </div>


        <div className="vote_sect">
          <div className="vote_sect_img">

          </div>

          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">{eth_address ? "Algorand Address" : "Ethereum Address"}</p>
            <input
              type="text"
              placeholder={eth_address ? " ZW3IS....7W754" :"0x57....a4a3"}
              value={addressForConverter}
              pattern="^0x[a-fA-F0-9]{40}$"
              onChange={(e) => setAddressForConverter(e.target.value)}
            />
            <p className="ensure_txt">
              Address must be of standard length of an { eth_address ? "algo" : "eth"} wallet.
            </p>
          </div>

          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Amount to Convert</p>
            <input
              type="text"
              placeholder={eth_address ? "ERC20 Link" : "goLink"}
              value={amountToConvert}
              onChange={(e) => setAmountToConvert(e.target.value)}
            />
            <p className="ensure_txt">
              Enter goLink amount to convert to ERC20 Link.
            </p>
          </div>
          {
            isThereAddress ? (
              <div className="v_inp_cov inpCont_cand">
              <p>Conversion Fee</p>
              <p className="check">
              <input
                style={{cursor : "pointer"}}
                className="checkbox"
                type="checkbox"
                value={algoToSend}
                onClick={() => setalgoToSend(10)}
              />
               <span className="conditions" style={{fontSize : "13px"}}>Accept 10 $ALGO is required for conversion</span>
              </p>
            </div>
            ) : null
          }

         

          <br />

          <div className="crt_butt">
            <button onClick={convert}>Convert</button>
            <p className="safety">
              <span>Safety disclaimer :</span> We never store your data.
              Everything is encrypted.
            </p>
          </div>

          {/* ************** */}
        </div>

        {/* **************** */}
      </div>
    </div>
  );
};

export default Converter;
