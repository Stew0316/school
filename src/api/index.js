import axios from "axios";
import { message } from "antd";
import { LOCAL_ENV } from "@/common/localData";
import { createBrowserHistory } from "history";

const service = axios.create({
  baseURL: LOCAL_ENV.VITE_API,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
  timeout: 60000,
});

service.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxMjcuMC4wLjE6ODA4MCIsImF1ZCI6IjEyNy4wLjAuMTo4MDgwIiwiaWF0IjoxNzE4Mjc2MjkxLCJuYmYiOjE3MTgyNzYyOTEsImV4cCI6MTcyMzU0NjY5MSwianRpIjp7ImlkIjoyOCwidHlwZSI6InNjaG9vbCJ9fQ.pc6rCfPcy6xk71vSGY7GdzZaJ6-LJoFf10pIoMelYzQ`;
    return config;
  },
  (err) => {
    err.message = "服务器异常，请联系管理员！";
    // 错误抛到业务代码
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  (response) => {
    const history = createBrowserHistory();
    if (response.status != 200) {
      if (!response.config.noMessage) {
        message.error(response.data.message);
      }

      return Promise.reject(err);
    }
    if (response.config.responseType == "blob") {
      return response;
    }
    if (response.data.code == 401) {
      localStorage.removeItem(LOCAL_ENV.VITE_MAIN_KEY + "-token");
      history.replace(LOCAL_ENV.VITE_BASE_NAME + "/");
      return;
    }
    if (response.data && !response.data.errors) {
      return response.data;
    }

    return Promise.reject(response.data);
  },
  (err) => {
    const history = createBrowserHistory();
    message.error(
      err.response.data.message || err.message || JSON.stringify(err)
    );
    const response = err.response;
    if (response.status == 401) {
      localStorage.clear();
      history.replace(LOCAL_ENV.VITE_BASE_NAME + "/");
    }
    return Promise.reject(err);
  }
);

export default service;
