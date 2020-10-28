import { ApiUrl } from "../config/apiUrl";
import axiosInstance from "./axiosinstance";

export const GetAllNotesAPI = () => {
  return axiosInstance.get(`${ApiUrl.TEST_URL}notes`);
};

export const UpdateNoteAPI = (data) => {
  return axiosInstance.put(`${ApiUrl.TEST_URL}notes/${data.noteID}`, data);
};

export const DeleteNoteAPI = (data) => {
  return axiosInstance.delete(`${ApiUrl.TEST_URL}notes/${data.noteID}`);
};

export const AddNoteAPI = (data) => {
  return axiosInstance.post(
    `${ApiUrl.TEST_URL}projects/${data.projectID}/notes`,
    data
  );
};

export const GetProjectNotes = (data) => {
  return axiosInstance.get(
    `${ApiUrl.TEST_URL}projects/${data.projectID}/notes`
  );
};
