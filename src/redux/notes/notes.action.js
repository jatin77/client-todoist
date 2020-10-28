import {
  GetAllNotesAPI,
  UpdateNoteAPI,
  DeleteNoteAPI,
  AddNoteAPI,
  GetProjectNotes,
} from "../../api/notes";
import { notesActionTypes } from "./notes.actionTypes";

export const saveAllNotes = (data) => {
  return {
    type: notesActionTypes.FETCH_ALL_NOTES,
    payload: data,
  };
};

export const saveProjectNotes = (data) => {
  return {
    type: notesActionTypes.FETCH_PROJECT_NOTES,
    payload: data,
  };
};

export const getAllNotes = (data) => {
  return (dispatch) => {
    dispatch({
      type: notesActionTypes.FETCH_ALL_NOTES_LOADING,
    });
    GetAllNotesAPI()
      .then((res) => {
        dispatch(saveAllNotes(res.data.notes));
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        }
        dispatch({
          type: notesActionTypes.FETCH_ALL_NOTES_FAIL,
        });
      });
  };
};

export const getProjectNotes = (data) => {
  return (dispatch) => {
    dispatch({
      type: notesActionTypes.FETCH_PROJECT_NOTES_LOADING,
    });
    GetProjectNotes(data)
      .then((res) => {
        dispatch(saveProjectNotes(res.data.notes));
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        }
        dispatch({
          type: notesActionTypes.FETCH_PROJECT_NOTES_FAIL,
        });
      });
  };
};

export const updateNote = (data) => {
  return (dispatch) => {
    dispatch({
      type: notesActionTypes.UPDATE_NOTE_LOADING,
    });
    UpdateNoteAPI(data)
      .then((res) => {
        if (data.openedProject) {
          dispatch({
            type: notesActionTypes.UPDATE_PROJECT_NOTE,
            payload: { ...res.data.note, openedProject: data.openedProject },
          });
        } else {
          dispatch({
            type: notesActionTypes.UPDATE_NOTE,
            payload: res.data.note,
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        }
        dispatch({
          type: notesActionTypes.UPDATE_NOTE_FAIL,
        });
      });
  };
};

export const deleteNote = (data) => {
  return (dispatch) => {
    dispatch({
      type: notesActionTypes.DELETE_NOTE_LOADING,
    });
    DeleteNoteAPI(data)
      .then((res) => {
        if (data.openedProject) {
          console.log("removing", data.noteID);
          dispatch({
            type: notesActionTypes.DELETE_PROJECT_NOTE,
            payload: data.noteID,
          });
        } else {
          dispatch({
            type: notesActionTypes.DELETE_NOTE,
            payload: data.noteID,
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        }
        dispatch({
          type: notesActionTypes.DELETE_NOTE_FAIL,
        });
      });
  };
};

export const addNote = (data) => {
  return (dispatch) => {
    dispatch({
      type: notesActionTypes.ADD_NOTE_LOADING,
    });
    AddNoteAPI(data)
      .then((res) => {
        if (data.openedProject) {
          dispatch({
            type: notesActionTypes.ADD_PROJECT_NOTE,
            payload: { ...res.data.note, openedProject: data.openedProject },
          });
        } else {
          dispatch({
            type: notesActionTypes.ADD_NOTE,
            payload: res.data.note,
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        }
        dispatch({
          type: notesActionTypes.ADD_NOTE_FAIL,
        });
      });
  };
};
