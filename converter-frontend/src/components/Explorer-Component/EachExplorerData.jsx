import React from "react";
import './EachExplorerData.scss';

const EachData = ({eth, algo, amount}) => {
  return(
   <div className="explorer-item">
       <span className="eth">{eth.substring(0, 19)}..</span>
       <span className="algo">{algo.substring(0, 19)}...</span>
       <span amount="amount">{amount}</span>
   </div>
   
  )

}

export default EachData;