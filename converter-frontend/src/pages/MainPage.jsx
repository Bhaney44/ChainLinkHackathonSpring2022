import NavBar from "../components/Navigation/NavBar";
import Scroll from "../components/Scroll";
import { NavLink, Route, Routes } from "react-router-dom";
import { useWindowSize } from "@react-hook/window-size";
import Converter from "../components/Converter";
import ExplorerPage from "./ExplorerPage/ExplorerPage";
import LandingPage from "./LandingPage/LandingPage";
import MobileNav from "../components/Navigation/MobileNav";

const MainPage = () => {

  const [width] = useWindowSize();


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
          opacity:  0.078,
          position: "fixed",
          pointerEvents: "none",
          background: `url("https://i.postimg.cc/vZfTS6zb/ch.png")`,
        }}
      />
      <Scroll word={"A converter for Algorand and Ethereum using Chainlink - TestNet"} />
      {
        width < 850 ? <MobileNav /> : null
      }
      <NavBar NavLink={NavLink} />
   
     <Routes>
        <Route path="/converter" element={<Converter/>} />
        <Route path="/" element={<LandingPage />} />
        <Route path='/explorer' element={<ExplorerPage/>} /> 
     </Routes>
    
    </main>
  );
};

export default MainPage;
