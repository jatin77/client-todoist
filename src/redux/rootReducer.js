import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import notesReducer from "./notes/notes.reducer";
import projectsReducer from "./projects/projects.reducer";
import userReducer from "./user/user.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  notes: notesReducer,
  projects: projectsReducer,
});

export default persistReducer(persistConfig, rootReducer);
