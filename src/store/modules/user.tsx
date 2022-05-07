import { makeAutoObservable } from "mobx";

export default class User {
  /**
   * this上绑定的变量需要在此处声明，否则ts检查会报错
   */
  state: { token: string };

  constructor() {
    /**
     * state
     */
    this.state = {
      token: "aaa",
    };
    // 自动将已经存在的对象属性并且使得它们可观察
    // makeAutoObservable 不能被用于带有 super 的类或 子类。
    makeAutoObservable(this);
  }
  /**
   * computed
   */
  get isLogin() {
    return this.state.token;
  }
  /**
   * action
   */
  setToken(val) {
    this.state.token = val || "";
  }
}
