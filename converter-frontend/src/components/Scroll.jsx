const Scroll = ({ word }) => {
  return (
    <div className="Marquee__Wrapper">
      <div className="Marquee__TextHolder">
        <div className="Marquee__TextGroup">
          <p
          className="scroll"
            style={{
              width: "100%",
              fontSize: "12px",
              fontWeight: "500",
              wordSpacing: "4px",
              padding: "20px 0px",
              textTransform: "uppercase",
              color: "blue"
              // borderTop: "1px solid var(--border-default)",
              // borderBottom: "1px solid var(--border-default)",
            }}
          >
            {word}
            <span className="Marquee__Dot"></span>
          </p>
        </div>

        <div className="Marquee__TextGroup">
          <p
          className="scroll"
            style={{
              width: "100%",
              fontSize: "12px",
              fontWeight: "500",
              wordSpacing: "4px",
              padding: "20px 0px",
              textTransform: "uppercase",
              color: "red"
              // borderTop: "1px solid var(--border-default)",
              // borderBottom: "1px solid var(--border-default)",
            }}
          >
            {word}
            {/*  */}
            <span className="Marquee__Dot">
            {/* <i class="fa fa-star" aria-hidden="true"></i> */}
            </span>
          </p>
        </div>
        <div className="Marquee__TextGroup">
          <p
          className="scroll"
            style={{
              width: "100%",
              fontSize: "12px",
              fontWeight: "500",
              wordSpacing: "4px",
              padding: "20px 0px",
              textTransform: "uppercase",
              color:"purple"
              // borderTop: "1px solid var(--border-default)",
              // borderBottom: "1px solid var(--border-default)",
            }}
          >
            {word}
            <span className="Marquee__Dot"></span>
          </p>
        </div>
        <div className="Marquee__TextGroup">
          <p 
          className="scroll"
            style={{
              width: "100%",
              fontSize: "12px",
              fontWeight: "500",
              wordSpacing: "4px",
              padding: "20px 0px",
              textTransform: "uppercase",
              // borderTop: "1px solid var(--border-default)",
              // borderBottom: "1px solid var(--border-default)",
            }}
          >
            {word}
            <span className="Marquee__Dot"></span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Scroll;
