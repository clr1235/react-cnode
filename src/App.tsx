import { useRoutes } from "react-router-dom";
import routes from "@router/index";
import { useStore } from "@hooks/storeHook";
import { toJS } from "mobx";
// import { Button } from "antd";

// import styles from "./assets/style/app.less";
// import starUrl, { ReactComponent as Star } from './assets/svg/react.svg'
function App() {
  const { userStore } = useStore();
  userStore.setToken("ttt");
  console.log(toJS(userStore), "store-=-=-=", userStore);
  return useRoutes(routes);
}

export default App;
