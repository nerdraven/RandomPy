import React, { useEffect, FC, useState, useRef } from "react";

import "./index.css";

import Digit from "../Digit";

const Game: FC = () => {
  const [digits, setDigits] = useState<string[]>([]);
  const [text, setText] = useState("Hello");
  const ref = useRef<HTMLDivElement>(null);

  const keyEvent = (event: { key: string; keyCode: number }) => {
    console.log(event);
    if (event.key == "Backspace") {
      setDigits((prev) => {
        return [...prev.slice(0, -1)];
      });
    } else if (event.key == "Enter") {
      setText((prev) => {
        setTimeout(() => {
          setText(prev);
        }, 3000);
        setDigits([]);
        return "Hi World";
      });
    } else if (event.keyCode < 48 || event.keyCode > 57) {
      return;
    } else if (digits.length < 4) {
      setDigits((prev) => {
        return [...prev, event.key];
      });
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", keyEvent);
    return () => {
      document.removeEventListener("keyup", keyEvent);
    };
  }, [digits]);

  return (
    <div ref={ref}>
      <Digit nums={digits} />
      <p>{text}</p>
    </div>
  );
};

export default Game;
