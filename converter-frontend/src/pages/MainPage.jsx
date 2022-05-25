import NavBar from "../components/NavBar";
import Scroll from "../components/Scroll";
import { useSelector } from "react-redux";
import { NavLink, Route, Routes } from "react-router-dom";
import { useWindowSize } from "@react-hook/window-size";
import Converter from "../components/Converter";
import ExplorerPage from "./explorer/ExplorerPage";

const MainPage = () => {

  const [width] = useWindowSize();
  const darkTheme = useSelector((state) => state.status.darkTheme);

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
          opacity:  darkTheme ? 0.088 : 0.078,
          position: "fixed",
          pointerEvents: "none",
          background: `url("https://i.postimg.cc/vZfTS6zb/ch.png")`,
        }}
      />
      <Scroll word={"A converter for Algorand and Ethereum using Chainlink - TestNet"} />
      <NavBar darkTheme={darkTheme} NavLink={NavLink} />
     <Routes>
        <Route path="/converter" element={<Converter/>} />

        <Route path='/explorer' element={<ExplorerPage/>} /> 
     </Routes>
    
    </main>
  );
};

export default MainPage;
