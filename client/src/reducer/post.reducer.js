import { GET_POSTS, LIKE_POST } from "../actions/post.actions.js";

const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case LIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        //on ajoute le nouveau like sans enlever les anciens
                        likers: [action.payload.userId, ...post.likers],
                    };
                }
                return post;
            });
        default:
            return state;
    }
}
