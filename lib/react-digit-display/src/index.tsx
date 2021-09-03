import React, { useEffect, useRef } from "react";

import "./index.css";
import numberDisplay from "./numberDisplay";

type Props = {
  num: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Digit = ({ num }: Props) => {
  const ref = useRef(null);
  const display = numberDisplay("svg", 8).showNumber(0);

  useEffect(() => {
    display.showNumber(num);
  });

  return (
    <svg ref={ref}>
      Hello World
    </svg>
  );
};


export default Digit;


// function show(number: number): void {
//   d3.select(window).on("load", function () {

//     const display = numberDisplay("svg", 8).showNumber(0);

//     d3.select("#number").on("input", function () {
//       display.showNumber(number);
//     });
//   });
// }

// export default show;
