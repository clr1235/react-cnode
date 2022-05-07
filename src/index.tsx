import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// 重置浏览器样式
import "normalize.css";
// 引入文件
import App from "./App";
import store from "@store/index";
import StoreContext from "./contexts/storeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </BrowserRouter>
);
