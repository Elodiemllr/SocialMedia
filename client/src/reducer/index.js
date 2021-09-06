//regroupe tous les reducer

import { combineReducers } from "redux";
import postReducer from "./post.reducer.js";
import userReducer from "./user.reducer.js";
import usersReducer from "./users.reducer.js";

export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
});
