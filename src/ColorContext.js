// ColorContext.js
import React, { createContext, useState, useContext } from "react";

const ColorContext = createContext();

export const useColorContext = () => useContext(ColorContext);
export const colors = [
  "#8062D6",
  "#FCBAAD",
  "#322653",
  "#E48586",
  "#9288F8",
  "#CECE5A",
  "#916DB3",
  "#FFE17B",
  "#FD8D14",
  "#C51605",
];
export const ColorProvider = ({ children }) => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
console.log(currentColorIndex)
  const currentColor = colors[currentColorIndex];

  return (
    <ColorContext.Provider value={{ currentColor, setCurrentColorIndex }}>
      {children}
    </ColorContext.Provider>
  );
};
