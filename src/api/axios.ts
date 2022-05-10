import axios, { AxiosRequestConfig } from "axios";
import { notification } from "antd";

// 创建一个数组用于存储每个请求的取消函数和ajax标识符
const pending = [];
const CancelToken = axios.CancelToken;
const removePending = (config) => {
  for (const item of pending) {
    if (item.uniqueCode === `${config.url}& ${config.method}`) {
      //当当前请求在数组中存在时执行函数体
      item.fn(); //执行取消操作
      pending.splice(item, 1); //把这条记录从数组中移除
    }
  }
};

// 配置全局的axios默认值
axios.defaults.headers.post["Content-Type"] = "application/json";

// 请求配置
const options: AxiosRequestConfig = {
  timeout: 10000,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false,
  // `headers` 是即将被发送的自定义请求头
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
};
// 创建实例
const instance = axios.create(options);
// 请求拦截器
instance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // 检查网络
    if (!window.navigator.onLine) {
      console.log("网络请求失败，请检查您的网络设置！");
      return config;
    }
    let userInfo = {
      token: "",
    };
    const userInfoStr = localStorage.getItem("userInfo");
    userInfoStr && (userInfo = JSON.parse(userInfoStr));
    console.log(localStorage.getItem("userInfo"), "-=-=-=-=-");
    // 每次发送请求钱判断token是否存在
    // 如果存在，则统一在http请求的和header加上token，这样的话后端就可以根据token判断登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    config.headers.common["Authorization"] = userInfo.token;
    // 在一个ajax发送前执行一下取消操作
    removePending(config);
    config.cancelToken = new CancelToken(function (cancel) {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串
      pending.push({
        uniqueCode: `${config.url}& ${config.method}`,
        fn: cancel,
      });
    });
    return config;
  },
  function (error) {
    // 错误处理
    return Promise.reject(error);
  }
);
// 添加响应拦截器
instance.interceptors.response.use(
  function (response: any) {
    if (response.status === 200) {
      //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
      removePending(response.config);
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  function (error) {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response?.status, response?.data?.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        // store.commit('changeNetwork', false);
      } else {
        return Promise.reject(error);
      }
    }
  }
);

// 请求失败的统一错误处理
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      // 跳转登陆页

      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      // tip('登录过期，请重新登录');
      localStorage.removeItem("token");
      // store.commit('loginSuccess', null);
      // setTimeout(() => {
      //   toLogin();
      // }, 1000);
      break;
    // 404请求不存在
    case 404:
      // tip('请求的资源不存在');
      break;
    default:
      console.log(other);
  }
};

export default instance;
