import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "antd";

import styles from "./assets/style/app.less";
// import starUrl, { ReactComponent as Star } from './assets/svg/react.svg'
function App() {
  return (
    <div className={styles.app}>
      <Button type="primary" size="large" shape="round">
        learn React hooks
      </Button>
      <Link to="/invoices">去invoices</Link>
      <Outlet />
    </div>
  );
}

export default App;
