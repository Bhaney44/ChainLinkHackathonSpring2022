import React from "react";
import './ExplorerList.scss';

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
       </div>
    )
}

export default ExplorerList;