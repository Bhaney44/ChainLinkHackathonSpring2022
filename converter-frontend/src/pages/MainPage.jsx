import NavBar from "../components/NavBar";
import Scroll from "../components/Scroll";

import Converter from "../components/Converter";

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
          opacity:  0.1,
          position: "fixed",
          pointerEvents: "none",
          background: `url("https://i.postimg.cc/vZfTS6zb/ch.png")`,
        }}
      />
      <Scroll word={"A converter for Algorand and Ethereum using Chainlink - TestNet"} />
      <NavBar />

        <Converter />
    
    </main>
  );
};

export default MainPage;
