import React from "react";
import SearchInput from "../../components/Search-Input/Search-Input";
import ExplorerList from "../../components/Explorer-Component/ExplorerList";
import { useEffect, useState } from "react";
import BarLoader from 'react-spinners/BarLoader';
import axios from "axios";
const ExplorerPage = () => {
    const [data, setData] = useState([]);
    const [searchField, setSearchField] = useState('');

    const onSearchChange = (event) => {
        setSearchField(event.target.value);
       }
    const filteredData = data.filter(address =>{
     if(address.algo_address.toLowerCase().includes(searchField.toLowerCase())) {
        return address.algo_address.toLowerCase().includes(searchField.toLowerCase()) 
     } else if(address.eth_address.toLowerCase().includes(searchField.toLowerCase())) {
        return  address.eth_address.toLowerCase().includes(searchField.toLowerCase());
     }
        
         
      }) 

    useEffect(() => {
        axios.get('https://chainlink-backend.herokuapp.com/explorer/data')
        .then((response => {
            setData(response.data.data)
        }

        ))
    }, [])
return (
    <div>
       <SearchInput searchChange={onSearchChange}/>
       {
         !data.length ? (
          <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            color: "var(--wht)",
            textAlign: "center",
            fontSize: "14px",
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          <p style={{ opacity: 0.8, margin: "30px 0px 20px" }}>LOADING...</p>
          <BarLoader
        //   darkTheme ? "#eee" :
            color={ "#888"}
            size={150}
            speedMultiplier="0.5"
          />
        </div>
         ) :
         <ExplorerList  explorerlist={filteredData} />
       }
      
   </div>
)
  
}
export default ExplorerPage;