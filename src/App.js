// App.js
import React from "react";
import "./App.css";
import Quote from "./QuoteGenerator";
import { useColorContext } from "./ColorContext";

const App = () => {
  const { currentColor } = useColorContext();
  return (
    <div className=" App" style={{ backgroundColor: currentColor }}>
      <div
        id="quote-box"
        className="container position-absolute top-50 start-50 translate-middle"
      >
        <Quote />
      </div>
     
    </div>
  );
};

export default App;
