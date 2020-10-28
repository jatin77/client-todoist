import {
  GetAllProjectsAPI,
  AddProjectAPI,
  UpdateProjectAPI,
} from "../../api/projects";
import { projectsActionTypes } from "./projects.actionTypes";

export const saveAllProjects = (data) => {
  return {
    type: projectsActionTypes.FETCH_ALL_PROJECTS,
    payload: data,
  };
};

export const getAllProjects = (data) => {
  return (dispatch) => {
    dispatch({
      type: projectsActionTypes.FETCH_ALL_PROJECTS_LOADING,
    });
    GetAllProjectsAPI()
      .then((res) => {
        dispatch(saveAllProjects(res.data.projects));
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        }
        dispatch({
          type: projectsActionTypes.FETCH_ALL_PROJECTS_FAIL,
        });
      });
  };
};

export const addProject = (data) => {
  return (dispatch) => {
    dispatch({
      type: projectsActionTypes.ADD_PROJECT_LOADING,
    });
    AddProjectAPI(data)
      .then((res) => {
        dispatch({
          type: projectsActionTypes.ADD_PROJECT,
          payload: res.data.project,
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        }
        dispatch({
          type: projectsActionTypes.ADD_PROJECT_FAIL,
        });
      });
  };
};

export const updateProject = (data) => {
  return (dispatch) => {
    dispatch({
      type: projectsActionTypes.UPDATE_PROJECT_LOADING,
    });
    UpdateProjectAPI(data)
      .then((res) => {
        dispatch({
          type: projectsActionTypes.UPDATE_PROJECT,
          payload: res.data.project,
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        }
        dispatch({
          type: projectsActionTypes.UPDATE_PROJECT_FAIL,
        });
      });
  };
};
