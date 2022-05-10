import { useRoutes } from "react-router-dom";
import routes from "@router/index";
import { useStore } from "@hooks/storeHook";
import { toJS } from "mobx";

import "./assets/style/app.less";
// import starUrl, { ReactComponent as Star } from './assets/svg/react.svg'
import Api from "@api/index";
import { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = {
      page: 1,
      tab: "ask",
      limit: 10,
      mdrender: false,
    };
    const getTopics = async () => {
      const { data } = await Api.loginService.getTopics(fetchData);
      console.log(data, "data-=-=-=");
      setData(data);
    };
    console.log(data, "data-0-0-0");
    getTopics();
  }, []);
  return useRoutes(routes);
}

export default App;
