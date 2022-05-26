import React from "react";
import './MobileNav.scss';

const MobileNav = () => {
    return (

        <div
        style={{
          right : "210px",
          top:"46px",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
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
    
            
            <p className="dropDownConnect_item_txt">
             Converter
            </p>
          </div>
          <div
            className="dropDownConnect_item each"
          >
            <p className="dropDownConnect_item_txt">
             Explorer
            </p>
          </div>

          <div
            className="dropDownConnect_item each"
          >
          
            <p className="dropDownConnect_item_txt">
              Disconnect
            </p>
          </div>

        </div>
      </div>
    </div>
</div>
    )
}

export default MobileNav;