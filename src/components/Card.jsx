import React, { useState } from "react";
import cardback from "../assets/playing-card.png";

export default function Card({ id, value, click, frontBg }) {
  const [stayClicked, setStayClicked] = useState(false);
  let curFronBg = frontBg(value);

  return (
    <div
      id={id}
      className={`card`}
      onClick={async (e) => await click(e, id, value, setStayClicked)}
    >
      {stayClicked ? (
        <div
          className="front-side"
          style={{ backgroundImage: `url(${curFronBg})` }}
        ></div>
      ) : (
        <div
          className="back-side"
          style={{ backgroundImage: "url(" + cardback + ")" }}
        ></div>
      )}
    </div>
  );
}
