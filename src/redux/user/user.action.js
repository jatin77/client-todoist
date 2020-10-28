import {
  GetMeAPI,
  LoginAPI,
  RegisterAPI,
  UpdateMeAPI,
  UpdatePasswordAPI,
} from "../../api/auth";
import { userActionTypes } from "./user.actionTypes";

export const saveLogin = (data) => {
  return {
    type: userActionTypes.LOGIN,
    payload: data,
  };
};

export const saveRegister = (data) => {
  return {
    type: userActionTypes.REGISTER,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: userActionTypes.LOGOUT,
  };
};

export const login = (data) => {
  return (dispatch) => {
    dispatch({
      type: userActionTypes.LOGIN_LOADING,
    });
    LoginAPI(data)
      .then((res) => {
        dispatch(saveLogin(res.data.token));
      })
      .catch((error) => {
        alert(error.response.data.error);
        dispatch({
          type: userActionTypes.LOGIN_FAIL,
        });
      });
  };
};

export const register = (data) => {
  return (dispatch) => {
    dispatch({
      type: userActionTypes.REGISTER_LOADING,
    });
    RegisterAPI(data)
      .then((res) => {
        dispatch(saveRegister(res.data.token));
      })
      .catch((error) => {
        alert(error.response.data.error);
        dispatch({
          type: userActionTypes.REGISTER_FAIL,
        });
      });
  };
};

export const getMe = (data) => {
  return (dispatch) => {
    dispatch({
      type: userActionTypes.GETME_LOADING,
    });
    GetMeAPI()
      .then((res) => {
        dispatch({
          type: userActionTypes.GETME,
          payload: res.data.user,
        });
      })
      .catch((error) => {
        alert(error.response.data.error);
        dispatch({
          type: userActionTypes.GETME_FAIL,
        });
      });
  };
};

export const updateName = (data) => {
  return (dispatch) => {
    dispatch({
      type: userActionTypes.UPDATENAME_LOADING,
    });
    UpdateMeAPI(data)
      .then((res) => {
        dispatch({
          type: userActionTypes.UPDATENAME,
          payload: res.data.fieldsToUpdate.name,
        });
      })
      .catch((error) => {
        alert(error.response.data.error);
        dispatch({
          type: userActionTypes.UPDATENAME_FAIL,
        });
      });
  };
};

export const updateEmail = (data) => {
  return (dispatch) => {
    dispatch({
      type: userActionTypes.UPDATEEMAIL_LOADING,
    });
    UpdateMeAPI(data)
      .then((res) => {
        dispatch({
          type: userActionTypes.UPDATENAME,
          payload: res.data.fieldsToUpdate.email,
        });
      })
      .catch((error) => {
        alert(error.response.data.error);
        dispatch({
          type: userActionTypes.UPDATEEMAIL_FAIL,
        });
      });
  };
};

export const updatePassword = (data) => {
  return (dispatch) => {
    dispatch({
      type: userActionTypes.UPDATEPASSWORD_LOADING,
    });
    UpdatePasswordAPI(data)
      .then((res) => {
        dispatch({
          type: userActionTypes.UPDATEPASSWORD,
          payload: res.data.token,
        });
      })
      .catch((error) => {
        alert(error.response.data.error);
        dispatch({
          type: userActionTypes.UPDATEPASSWORD_FAIL,
        });
      });
  };
};
