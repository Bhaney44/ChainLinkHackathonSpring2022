import React from "react";
import './MobileNav.scss';

const MobileNav = ({NavLink}) => {

    const isWalletConnected =
    localStorage.getItem("wallet-type") === null ? false : true;

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

    return (

        <div
        style={{
          right : isWalletConnected ? "250px" : "200px" ,
          top:"46px",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}

        className={isWalletConnected ? "mobilenav" : null}
      >
        <div className="addrDisplay display">
        <div className="dropDownConnect">
        <div className="dropDownConnect_button">
          <button className="connect_wallet_button navigation">
           <img src="https://i.postimg.cc/MTKPkvtL/nav.png" alt="icon" style={{width : "30px"}} />
          </button>
        </div>

        <div className="dropDownConnect_items">
          <div className="dropDownConnect_item each">
    
          <NavLink
              to={`/converter`}
              key={"converter"} >
            <p className="dropDownConnect_item_txt">
              Converter   
            </p>
            </NavLink>
          </div>
          <div
            className="dropDownConnect_item each"
          >
          <NavLink
               to={`/explorer`}
               key={"explorer"}
             >
            <p className="dropDownConnect_item_txt">
            Explorer
            </p>
         </NavLink>
          </div>
       {
           isWalletConnected ? 
           <div
           className="dropDownConnect_item each"
         >
         
           <p onClick={LogOut} className="dropDownConnect_item_txt" style={{ color : "red"}}>
             Disconnect
           </p>
         </div> : null
       }
       

        </div>
      </div>
    </div>
</div>
    )
}

export default MobileNav;