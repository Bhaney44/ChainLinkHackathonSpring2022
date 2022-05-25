import NavBar from "../components/NavBar";
import Scroll from "../components/Scroll";
import { NavLink, Route, Routes } from "react-router-dom";
import Converter from "../components/Converter";
import ExplorerPage from "./explorer/ExplorerPage";

const MainPage = () => {

  return (
    <main
      className="light_theme big_screen"
      id="main_main"
    >
      <div
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          content: "",
          width: "100%",
          height: "100%",
          opacity:  0.05,
          position: "fixed",
          pointerEvents: "none",
          background: `url("https://i.postimg.cc/vZfTS6zb/ch.png")`,
        }}
      />
      <Scroll word={"A converter for Algorand and Ethereum using Chainlink - TestNet"} />
      <NavBar />
     <Routes>
        <Route path="/converter" element={<Converter/>} />
        <Route path='/explorer' element={<ExplorerPage />} /> 
     </Routes>
 
    
    </main>
  );
};

export default MainPage;
