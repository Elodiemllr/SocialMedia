//regroupe tous les reducer

import { combineReducers } from "redux";
import allPostsReducer from "./allPosts.reducer.js";
import config from "./config.reducer.js";
import errorReducer from "./error.reducer.js";
import postReducer from "./post.reducer.js";
import trendingReducer from "./trending.reducer.js";
import userReducer from "./user.reducer.js";
import usersReducer from "./users.reducer.js";

export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    errorReducer,
    allPostsReducer,
    trendingReducer,
    config,
});
