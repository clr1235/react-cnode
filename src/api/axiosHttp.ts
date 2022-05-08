import axios, { AxiosRequestConfig } from "axios";
import { notification } from "antd";

// 处理baseURL
type envType = "production" | "development" | "test";
function getBaseURL(env?: envType) {
  const baseMap = {
    production: "/",
    development: "https://cnodejs.org/api/v1",
    test: "/",
  };
  if (!env) {
    return "/";
  }
  return baseMap[env];
}
// 配置全局的axios默认值
axios.defaults.headers.post["Content-Type"] = "application/json";

// 创建axios实例
function axiosHttp(axiosConfig: AxiosRequestConfig) {
  // 请求配置
  const options: AxiosRequestConfig = {
    // baseURL将自动加在url前面，除非url是一个绝对路径
    baseURL: getBaseURL("development"),
    timeout: 3000,
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
    function (config) {
      // 参数处理
      console.log(config, "config-=-=-=-=-=");
      return config;
    },
    function (error) {
      // 错误处理
    }
  );
  // 添加响应拦截器
  instance.interceptors.response.use(
    function (response: any) {
      // 对响应数据做点什么
      if (typeof response.data !== "object") {
        // notification.error({
        //   description: '异常'
        // })
        return Promise.reject(response);
      }
      if (response.data.code && response.data.code !== 200) {
        if (response.data.msg) notification.error(response.data.msg);
        if (response.data.code == 401) {
          window.location.href = "/login";
        }
        return Promise.reject(response.data);
      }
      return response.data;
    },
    function (error) {
      // 统一错误处理
      if (error && error.response) {
        // notification.error({
        //   description: error.response.data.message
        // });
      }
      return Promise.resolve(error.response.data);
    }
  );
  return instance(axiosConfig);
}

export default axiosHttp;
