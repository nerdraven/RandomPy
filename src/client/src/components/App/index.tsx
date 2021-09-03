import React, { useEffect, FC, useState, useRef } from "react";

import "./index.css";

import Logo from "../Logo";
import Digit from "../Digit";


const Hello: FC = () => {
  const [digits, setDigits] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const keyEvent = (e: { key: string; keyCode: number }) => {
    if (e.key == "Backspace") {
      setDigits((prev) => {
        return [...prev.slice(0, -1)];
      });
    } else if (e.keyCode < 48 || e.keyCode > 57) {
      return;
    } else if (digits.length < 4)
      setDigits((prev) => {
        return [...prev, e.key];
      });
  };

  useEffect(() => {
    document.addEventListener("keyup", keyEvent);
    return () => {
      document.removeEventListener("keyup", keyEvent);
    };
  }, [digits]);

  return (
    <div className="container" ref={ref}>
      <div className="main">
        <Logo />
        <Digit nums={digits} />
      </div>
    </div>
  );
};

export default Hello;
