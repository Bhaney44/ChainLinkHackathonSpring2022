import React from "react";
import './ExplorerList.scss';
import EachData from "./EachExplorerData";

const ExplorerList = () => {
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
           <EachData />
           <EachData />
       </div>
    )
}

export default ExplorerList;