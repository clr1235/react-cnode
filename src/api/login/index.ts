// import { AxiosRequestConfig } from "axios";
import axiosInstance from "../axios";
import base from "../contants";

const baseURL = base.cNode;

const getTopics = (params: any) => {
  const url = `${baseURL}/topics`;
  const conf = {
    params,
  };
  return axiosInstance.get(url, conf);
};

export default {
  getTopics,
};
