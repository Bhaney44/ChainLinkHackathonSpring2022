import React from "react";
import './EachExplorerData.scss';
import { useWindowSize } from "@react-hook/window-size";

const EachData = ({eth, algo, amount}) => {
  const [width] = useWindowSize();

  return(
    
      <div className="explorer-item">
      <span className="eth">{width > 500 ? `${eth.substring(0, 19)}..` : `${eth.substring(0, 9)}...`}</span>
      <span className="algo">{width > 500 ? `${algo.substring(0, 19)}..` : `${algo.substring(0, 9)}..`} </span>
      <span amount="amount">{amount}</span>
      </div>
 

   
   
  )

}

export default EachData;