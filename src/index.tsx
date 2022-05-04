import React from "react";
import ReactDOM from "react-dom/client";
// 重置浏览器样式
import "normalize.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
