import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
export default class User {
  /**
   * this上绑定的变量需要在此处声明，否则ts检查会报错
   */
  token: string;

  constructor() {
    /**
     * state
     */
    (this.token = "rong_c_node"),
      // 自动将已经存在的对象属性并且使得它们可观察
      // makeAutoObservable 不能被用于带有 super 的类或 子类。
      makeAutoObservable(this);
    // 数据持久化存储
    makePersistable(this, {
      name: "userInfo",
      // 要保存的字段，这些字段会被保存在name对应的storage中，
      // 注意：不写在这里面的字段将不会被保存，刷新页面也将丢失：get字段例外。get数据会在数据返回后再自动计算
      properties: ["token"],
      storage: window.localStorage,
    });
  }
  /**
   * computed
   */
  get isLogin() {
    return this.token;
  }
  /**
   * action
   */
  setToken(val) {
    this.token = val || "";
  }
}
