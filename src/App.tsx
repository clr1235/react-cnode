import { useRoutes } from "react-router-dom";
import routes from "@router/index";
// import { Button } from "antd";

// import styles from "./assets/style/app.less";
// import starUrl, { ReactComponent as Star } from './assets/svg/react.svg'
function App() {
  return useRoutes(routes);
}

export default App;
