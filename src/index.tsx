import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// 重置浏览器样式
import "normalize.css";
// 引入文件
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
