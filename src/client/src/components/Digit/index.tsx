import React, { FC } from "react";
import DigitalDigit from "digital-digit";

import "./index.css";

export type DigitType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0;

const color = "#efd3d3";
const opacitySegment = 0.7;

type DigitProp = {
  num: string;
}

const Digit: FC<DigitProp> = ({ num }) => {

  return (
    <div className="digit">
      <DigitalDigit digit={Number(num) as DigitType} color={color} opacitySegment={opacitySegment} />
    </div>
  );
};


type DigitDisplayProp = {
  nums: Array<string>;
}

const DigitDisplay: FC<DigitDisplayProp> = ({ nums }) => {
  const count = 4;
  const res = [];

  for (let i = 0; i < count; i++) {
    const num = nums[i] || "0";
    res.push(
      <Digit key={i} num={num} />
    );
  }

  return (
    <div className="digits">
      {res.map(digit => {
        return digit;
      })}
    </div>
  );
};

export default DigitDisplay;