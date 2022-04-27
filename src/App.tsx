import React from 'react';
// import './app.css';
// import styles from './app.module.css';
// import  './app.less';
import styles from './app.module.less';
import reactPng from './assets/images/react.png';
import starUrl, { ReactComponent as Star } from './assets/svg/react.svg'
function App() {
  return (
    <div className={styles.app}>
      <div className={styles.content}>
        Learn React 哈哈哈哦哦哦
        <img className={styles.img} src={reactPng} alt="" />
      </div>
      <img src={starUrl}></img>
      <Star/>
    </div>
  );
}

export default App;
