import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import WalletConnect from "@walletconnect/client"; 
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import algosdk from "algosdk";
import "../styles/converter.css";


const Converter = () => {
  // algod Client
  const algod_token = {
    "X-API-Key": "z6H94GE3sI8w100S7MyY92YMK5WIPAmD6YksRDsC"
  }
  const algod_address = "https://testnet-algorand.api.purestake.io/ps2";
  const headers = "";

  const algodClient = new algosdk.Algodv2(algod_token, algod_address, headers);
  const walletType = localStorage.getItem("wallet-type");
  const isWalletConnected =
  localStorage.getItem("wallet-type") === null ? false : true;

  const myAlgoWallet = new MyAlgoConnect();

  // wallet-type & address
  // const walletType = localStorage.getItem("wallet-type");
  // const walletAddress = localStorage.getItem("address");

  const dispatch = useDispatch();
  
  const [addressForConverter, setAddressForConverter] = useState("");
  const [amountToConvert, setAmountToConvert] = useState("");

  const [algoToSend, setalgoToSend] = useState(null);


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
  if(!algoToSend) {
    dispatch({
      type: "alert_modal",
      alertContent: "You have To Accept Terms & Conditions Before Making Conversion",
    });
    return;
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
            <p className="inp_tit">Ethereum Address</p>
            <input
              type="text"
              placeholder="0x57....a4a3"
              value={addressForConverter}
              pattern="^0x[a-fA-F0-9]{40}$"
              onChange={(e) => setAddressForConverter(e.target.value)}
            />
            <p className="ensure_txt">
              Address must be of standard length of an eth wallet.
            </p>
          </div>

          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Amount to Convert</p>
            <input
              type="number"
              placeholder="20 goLink"
              value={amountToConvert}
              onChange={(e) => setAmountToConvert(e.target.value)}
            />
            <p className="ensure_txt">
              Enter goLink amount to convert to ERC20 Link.
            </p>
          </div>

          <div className="v_inp_cov inpCont_cand">
            <p>Conversion Fee</p>
            <p className="check">
            <input
              style={{cursor : "pointer"}}
              className="checkbox"
              type="checkbox"
              value={algoToSend}
              onChange={() => setalgoToSend(10)}
            />
             <span className="conditions" style={{fontSize : "13px"}}>Accept 10 $ALGO is required for conversion</span>
            </p>
          </div>

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
