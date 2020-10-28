import { updateProjectHelper } from "./project.utils";
import { projectsActionTypes } from "./projects.actionTypes";

const INITIAL_STATE = {
  allProjects: [],
  allProjectsLoading: false,
  addProjectLoading: false,
  updateProjectLoading: false,
};

const projectsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case projectsActionTypes.FETCH_ALL_PROJECTS_LOADING:
      return {
        ...state,
        allProjectsLoading: true,
      };
    case projectsActionTypes.FETCH_ALL_PROJECTS:
      return {
        ...state,
        allProjects: action.payload,
        allProjectsLoading: false,
      };
    case projectsActionTypes.FETCH_ALL_PROJECTS_FAIL:
      return {
        ...state,
        allProjects: [],
        allProjectsLoading: false,
      };
    case projectsActionTypes.ADD_PROJECT_LOADING:
      return {
        ...state,
        addProjectLoading: true,
      };
    case projectsActionTypes.ADD_PROJECT:
      return {
        ...state,
        allProjects: [action.payload, ...state.allProjects],
        addProjectLoading: false,
      };
    case projectsActionTypes.ADD_PROJECT_FAIL:
      return {
        ...state,
        addProjectLoading: false,
      };
    case projectsActionTypes.UPDATE_PROJECT_LOADING:
      return {
        ...state,
        updateProjectLoading: true,
      };
    case projectsActionTypes.UPDATE_PROJECT:
      return {
        ...state,
        allProjects: updateProjectHelper(state.allProjects, action.payload),
        updateProjectLoading: false,
      };
    case projectsActionTypes.UPDATE_PROJECT_FAIL:
      return {
        ...state,
        updateProjectLoading: false,
      };
    default:
      return state;
  }
};

export default projectsReducer;
