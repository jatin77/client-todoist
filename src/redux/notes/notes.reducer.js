import { notesActionTypes } from "./notes.actionTypes";
import {
  deleteNoteHelper,
  updateNoteHelper,
  updateProjectNoteHelper,
  addProjectNoteHelper,
} from "./notes.utils";

const INITIAL_STATE = {
  allNotes: [],
  projectNotes: [],
  allNotesLoading: false,
  projectNotesLoading: false,
  updateNoteLoading: false,
  deleteNoteLoading: false,
  addNoteLoading: false,
};

const notesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case notesActionTypes.FETCH_ALL_NOTES_LOADING:
      return {
        ...state,
        allNotesLoading: true,
      };
    case notesActionTypes.FETCH_ALL_NOTES:
      return {
        ...state,
        allNotes: action.payload,
        allNotesLoading: false,
      };
    case notesActionTypes.FETCH_ALL_NOTES_FAIL:
      return {
        ...state,
        allNotes: [],
        allNotesLoading: false,
      };
    case notesActionTypes.FETCH_PROJECT_NOTES_LOADING:
      return {
        ...state,
        projectNotesLoading: true,
      };
    case notesActionTypes.FETCH_PROJECT_NOTES:
      return {
        ...state,
        projectNotes: action.payload,
        projectNotesLoading: false,
      };
    case notesActionTypes.FETCH_PROJECT_NOTES_FAIL:
      return {
        ...state,
        projectNotes: [],
        projectNotesLoading: false,
      };
    case notesActionTypes.UPDATE_NOTE_LOADING:
      return {
        ...state,
        updateNoteLoading: true,
      };
    case notesActionTypes.UPDATE_NOTE:
      return {
        ...state,
        allNotes: updateNoteHelper(state.allNotes, action.payload),
        updateNoteLoading: false,
      };
    case notesActionTypes.UPDATE_PROJECT_NOTE:
      return {
        ...state,
        projectNotes: updateProjectNoteHelper(
          state.projectNotes,
          action.payload
        ),
        updateNoteLoading: false,
      };
    case notesActionTypes.UPDATE_NOTE_FAIL:
      return {
        ...state,
        updateNoteLoading: false,
      };
    case notesActionTypes.DELETE_NOTE_LOADING:
      return {
        ...state,
        deleteNoteLoading: true,
      };
    case notesActionTypes.DELETE_NOTE:
      return {
        ...state,
        allNotes: deleteNoteHelper(state.allNotes, action.payload),
        deleteNoteLoading: false,
      };
    case notesActionTypes.DELETE_PROJECT_NOTE:
      return {
        ...state,
        projectNotes: deleteNoteHelper(state.projectNotes, action.payload),
        deleteNoteLoading: false,
      };
    case notesActionTypes.DELETE_NOTE_FAIL:
      return {
        ...state,
        deleteNoteLoading: false,
      };
    case notesActionTypes.ADD_NOTE_LOADING:
      return {
        ...state,
        addNoteLoading: true,
      };
    case notesActionTypes.ADD_NOTE:
      return {
        ...state,
        allNotes: [action.payload, ...state.allNotes],
        addNoteLoading: false,
      };
    case notesActionTypes.ADD_PROJECT_NOTE:
      return {
        ...state,
        projectNotes: addProjectNoteHelper(state.projectNotes, action.payload),
        addNoteLoading: false,
      };
    case notesActionTypes.ADD_NOTE_FAIL:
      return {
        ...state,
        addNoteLoading: false,
      };
    default:
      return state;
  }
};

export default notesReducer;
