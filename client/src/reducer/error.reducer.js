import { GET_POST_ERRORS } from "../actions/post.actions.js";

const initialState = { postErrors: [] };

export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POST_ERRORS:
            return {
                postErrors: action.payload,
            };
        default:
            return state;
    }
}
