/**
 * 创建store状态管理的hook
 */

import { useContext } from "react";
import { observer } from "mobx-react-lite";

import StoreContext from "../contexts/storeContext";

function useStore() {
  const store = useContext(StoreContext);
  return store;
}

export { observer, useStore };
