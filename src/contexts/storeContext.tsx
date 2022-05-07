import React from "react";
import store from "@store/index";
// 使用react的context向下级传递数据，从而共享全局的可观察数据
const StoreContext = React.createContext(store);

export default StoreContext;
