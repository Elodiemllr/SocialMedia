import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
//import reportWebVitals from "./reportWebVitals";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import promiseMiddleware from "redux-promise";
//ATTENTION ENLEVER LORS DE LA MISE EN PRODUCTION (thunk et logger aussi)
import thunk from "redux-thunk";
import App from "../src/App";
import { getPosts } from "./actions/post.actions.js";
import { getUsers } from "./actions/users.actions.js";
import rootReducer from "./reducer/index.js";
import "./styles/index.scss";

const store = createStore(
    //composeWithDevTools nous permet d'acceder a tout ce qu'il y'a dans le store
    //thunk nous permet de faire des req async avec redux
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger, promiseMiddleware))
);
//lorsqu'on lance l'application on recup tout nos utilisateurs et tous nos posts
store.dispatch(getUsers());
store.dispatch(getPosts());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
