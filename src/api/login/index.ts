// import { AxiosRequestConfig } from "axios";
import axiosHttp from "../axiosHttp";

const getTopics = (params: any) => {
  const options = {
    url: "/topics",
    method: "GET",
    data: params,
  };
  return axiosHttp(options);
};

export default {
  getTopics,
};
