import React, { FC, SetStateAction, Dispatch, useState } from "react";
import { DigitType } from "../Digit";
import "./index.css";

type ResultProp = {
  nums: DigitType[];
  setNums: Dispatch<SetStateAction<DigitType[]>>;
}

const Result: FC<ResultProp> = ({ nums, setNums }: ResultProp) => {
  return (
    <div className="result">
      Result
    </div>
  );
};

export default Result;