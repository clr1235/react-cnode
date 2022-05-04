import React from "react";
import { Button } from "antd";

import styles from "./assets/style/app.less";
// import starUrl, { ReactComponent as Star } from './assets/svg/react.svg'
function App() {
  return (
    <div className={styles.app}>
      <div>
        <Button type="primary" size="large" shape="round">
          learn React hooks
        </Button>
      </div>
    </div>
  );
}

export default App;
