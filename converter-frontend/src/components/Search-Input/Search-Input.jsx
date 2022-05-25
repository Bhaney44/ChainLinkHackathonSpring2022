import React from "react";
import './Search-Input.scss';


const SearchInput = ({searchChange}) => {
  return(
    <div className="search">
        <input type='text' placeholder="Search Address" 
         onChange={searchChange}
        />
       
  </div>
  );
      
}

export default SearchInput;