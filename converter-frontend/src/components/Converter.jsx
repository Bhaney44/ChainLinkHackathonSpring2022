import { useState } from "react";
import { useDispatch } from "react-redux";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk from "algosdk";
import "../styles/converter.css";
const Converter = () => {
  // algod Client
  const algodClient = new algosdk.Algodv2(
    "",
    "https://node.testnet.algoexplorerapi.io",
    ""
  );
  const indexerClient = new algosdk.Indexer(
    "",
    "https://algoindexer.testnet.algoexplorerapi.io",
    ""
  );

  const myAlgoWallet = new MyAlgoConnect();

  // wallet-type & address
  const walletType = localStorage.getItem("wallet-type");
  const walletAddress = localStorage.getItem("address");

  const dispatch = useDispatch();
  
  const [processTit, setProcessTit] = useState("");
  const [electionDescription, setElectionDesciption] = useState("");

  const [algoToSend, setalgoToSend] = useState(1);



  

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
              value={processTit}
              pattern="^0x[a-fA-F0-9]{40}$"
              onChange={(e) => setProcessTit(e.target.value)}
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
              value={electionDescription}
              onChange={(e) => setElectionDesciption(e.target.value)}
            />
            <p className="ensure_txt">
              Enter goLink amount to convert to ERC20 Link.
            </p>
          </div>

          <div className="v_inp_cov inpCont_cand">
            <p>Conversion Fee</p>
            <p className="check">
            <input
              className="checkbox"
              type="checkbox"
              value={algoToSend}
              onChange={(e) => setalgoToSend(e.target.value)}
            />
             <span className="conditions" style={{fontSize : "13px"}}>Accept 10 $ALGO is required for conversion</span>
            </p>
          </div>

          <br />

          <div className="crt_butt">
            <button>Convert</button>
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
