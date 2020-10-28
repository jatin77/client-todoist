import Axios from "axios";
import { ApiUrl } from "../config/apiUrl";
import axiosInstance from "./axiosinstance";

export const LoginAPI = (data) => {
  return Axios.post(`${ApiUrl.TEST_URL}auth/login`, data);
};

export const ForgotPasswordAPI = (data) => {
  return Axios.post(`${ApiUrl.TEST_URL}auth/forgotPassword`, data);
};

export const RegisterAPI = (data) => {
  return Axios.post(`${ApiUrl.TEST_URL}auth/register`, data);
};

export const GetMeAPI = () => {
  return axiosInstance.get(`${ApiUrl.TEST_URL}auth/me`);
};

export const UpdateMeAPI = (data) => {
  return axiosInstance.put(`${ApiUrl.TEST_URL}auth/updateDetails`, data);
};

export const UpdatePasswordAPI = (data) => {
  return axiosInstance.put(`${ApiUrl.TEST_URL}auth/updatePassword`, data);
};
