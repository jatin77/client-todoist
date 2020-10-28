import axios from "axios";
import { ApiUrl } from "../config/apiUrl";
import { store } from "../redux/store";

const axiosInstance = (() => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    mode: "no-cors",
  };
  return axios.create({
    baseURL: ApiUrl.TEST_URL,
    headers: headers,
  });
})();

axiosInstance.interceptors.request.use(
  function (config) {
    const state = store.getState();
    const token = state.user.token;

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
