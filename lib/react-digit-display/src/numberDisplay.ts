import * as d3 from "d3";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function numberDisplay(ref: string, skew: number): any {
  skew = skew || 0;
  const xWidth = 56;

  const digitPattern = [
    [1, 1, 1, 1, 1, 1, 0], // 0
    [0, 1, 1, 0, 0, 0, 0], // 1
    [1, 1, 0, 1, 1, 0, 1], // 2
    [1, 1, 1, 1, 0, 0, 1], // 3
    [0, 1, 1, 0, 0, 1, 1], // 4
    [1, 0, 1, 1, 0, 1, 1], // 5
    [1, 0, 1, 1, 1, 1, 1], // 6
    [1, 1, 1, 0, 0, 0, 0], // 7
    [1, 1, 1, 1, 1, 1, 1], // 8
    [1, 1, 1, 1, 0, 1, 1], // 9
    [0, 0, 0, 0, 0, 0, 0], // empty
  ];

  const segments = [
    "M10,9l4-4h28l4,4l-4,4H14L10,9z",
    "M48,11l4,4v28l-4,4l-4-4V15L48,11z",
    "M48,51l4,4v28l-4,4l-4-4V55L48,51z",
    "M10,89l4-4h28l4,4l-4,4H14L10,89z",
    "M8,51l4,4v28l-4,4l-4-4V55L8,51z",
    "M8,11l4,4v28l-4,4l-4-4V15L8,11z",
    "M10,49l4-4h28l4,4l-4,4H14L10,49z",
  ];

  const svg = d3.select(ref);
  const width = Number(svg.attr("width"));
  const height = Number(svg.attr("height"));

  const w = ((100 * width) / height) | 0,
    viewBox = [0, 0, w, 100],
    numDigits = (w / xWidth) | 0;

  svg.attr("viewBox", viewBox.join(" "));

  const panel = svg.append("g");

  function addDigits() {
    const dx = (w - numDigits * xWidth) / 2;
    let x = skew > 0 ? 2 * dx : skew < 0 ? 0 : dx;
    for (let i = 0; i < numDigits; ++i) {
      panel
        .append("g")
        .attr("transform", ["translate(", x, ",0) skewX(", -skew, ")"].join(""))
        .classed("digit", true)
        .selectAll("path")
        .data(segments)
        .enter()
        .append("path")
        .attr("d", function (d) {
          return d;
        });
      x += xWidth;
    }
  }

  addDigits();

  class Display {
    showNumber (value: number) {
      value = Math.abs(value);
      const digits = panel.selectAll(".digit");

      digits
        .data(
          d3
            .format(numDigits + "d")(value)
            .split("")
            .map(function (i) {
              return "0123456789 ".indexOf(i);
            })
        )
        .selectAll("path")
        .data(function (d) {
          return digitPattern[d];
        })
        .classed("lit", (d: unknown) => {
          return d as boolean;
        });

      return Display;
    }
  }

  return Display;
}

export default numberDisplay;
