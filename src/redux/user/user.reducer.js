import { userActionTypes } from "./user.actionTypes";

const INITIAL_STATE = {
  token: null,
  loginLoading: false,
  registerLoading: false,
  getMeLoading: false,
  me: null,
  updateNameLoading: false,
  updateEmailLoading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.LOGIN_LOADING:
      return {
        ...state,
        loginLoading: true,
      };
    case userActionTypes.LOGIN:
      return {
        ...state,
        token: action.payload,
        loginLoading: false,
      };
    case userActionTypes.LOGIN_FAIL:
      return {
        ...state,
        token: null,
        loginLoading: false,
      };
    case userActionTypes.REGISTER_LOADING:
      return {
        ...state,
        registerLoading: true,
      };
    case userActionTypes.REGISTER:
      return {
        ...state,
        token: action.payload,
        registerLoading: false,
      };
    case userActionTypes.REGISTER_FAIL:
      return {
        ...state,
        token: null,
        registerLoading: false,
      };
    case userActionTypes.GETME:
      return {
        ...state,
        me: action.payload,
        getMeLoading: false,
      };
    case userActionTypes.GETME_LOADING:
      return {
        ...state,
        getMeLoading: true,
      };
    case userActionTypes.GETME_FAIL:
      return {
        ...state,
        me: null,
        getMeLoading: false,
      };
    case userActionTypes.UPDATENAME:
      let user = { ...state.me };
      user.name = action.payload;
      return {
        ...state,
        me: user,
        updateNameLoading: false,
      };
    case userActionTypes.UPDATENAME_LOADING:
      return {
        ...state,
        updateNameLoading: true,
      };
    case userActionTypes.UPDATENAME_FAIL:
      return {
        ...state,
        updateNameLoading: false,
      };
    case userActionTypes.UPDATEEMAIL:
      let userObj = { ...state.me };
      userObj.email = action.payload;
      return {
        ...state,
        me: user,
        updateEmailLoading: false,
      };
    case userActionTypes.UPDATEEMAIL_LOADING:
      return {
        ...state,
        updateEmailLoading: true,
      };
    case userActionTypes.UPDATEEMAIL_FAIL:
      return {
        ...state,
        updateEmailLoading: false,
      };
    case userActionTypes.UPDATEPASSWORD:
      return {
        ...state,
        token: action.payload,
        updatePasswordLoading: false,
      };
    case userActionTypes.UPDATEPASSWORD_LOADING:
      return {
        ...state,
        updatePasswordLoading: true,
      };
    case userActionTypes.UPDATEPASSWORD_FAIL:
      return {
        ...state,
        updatePasswordLoading: false,
      };
    case userActionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        me: null,
      };
    default:
      return state;
  }
};

export default userReducer;
