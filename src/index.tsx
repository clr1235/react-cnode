import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
// 重置浏览器样式
import "normalize.css";
// 引入antd样式，此处引入less文件是为了支持antd的全局主题色修改
import "antd/dist/antd.less";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale/zh_CN";
// 引入dayjs
import dayjs from "dayjs";
// 引入语言包
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
// 引入文件
import App from "./App";
import store from "@store/index";
import StoreContext from "./contexts/storeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <StoreContext.Provider value={store}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </StoreContext.Provider>
  </BrowserRouter>
);
