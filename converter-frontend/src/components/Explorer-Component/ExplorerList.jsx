import React from "react";
import './ExplorerList.scss';
import EachData from "./EachExplorerData";

const ExplorerList = ({explorerlist}) => {
    return (
       <div className="explorer-page">
           <div className="explorer-header">
           <div className='header-block'>
           <span> Ethereum Address </span>
          </div>
          <div className='header-block'>
           <span> Algorand Address </span>
          </div>
          <div className='header-block'>
           <span> Amount </span>
          </div>
           </div>
           {
               explorerlist.map((data, i) =>{
                   return(
                    <EachData key={i}
                       eth = {data.eth_address}
                       algo ={data.algo_address}
                       amount = {data.amount}

                    />
                   )
               } )
           }
          
           
       </div>
    )
}

export default ExplorerList;