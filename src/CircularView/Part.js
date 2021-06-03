import React from "react";
import * as R from "ramda";
import drawDirectedPiePiece from "./drawDirectedPiePiece";

const Part = ({
  radius,
  arrowheadLength = 0.5,
  annotationHeight,
  totalAngle,
  color,
  doesOverlapSelf,
  className
}) => {
  const path = drawDirectedPiePiece({
    radius,
    doesOverlapSelf,
    annotationHeight,
    totalAngle,
    arrowheadLength,
    tailThickness: 1 //feature specific
  });
  const colorToUse = R.startsWith(color, "override_")
    ? color.replace("override_", "")
    : "purple";
  return (
    <path
      className={className}
      strokeWidth="0.5"
      stroke={colorToUse}
      fill={colorToUse}
      fillOpacity={0.2}
      d={path.print()}
    />
  );
};
export default Part;
