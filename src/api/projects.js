import { ApiUrl } from "../config/apiUrl";
import axiosInstance from "./axiosinstance";

export const GetAllProjectsAPI = () => {
  return axiosInstance.get(`${ApiUrl.TEST_URL}projects`);
};


export const AddProjectAPI = (data) => {
  return axiosInstance.post(`${ApiUrl.TEST_URL}projects`,data);
};



export const UpdateProjectAPI = (data) => {
  return axiosInstance.put(`${ApiUrl.TEST_URL}projects/${data.projectID}`,data);
};