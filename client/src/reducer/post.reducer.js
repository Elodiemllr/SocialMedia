import {
    DELETE_COMMENT,
    EDIT_COMMENT,
    GET_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    UPDATE_POST,
} from "../actions/post.actions.js";

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
                } //si on rempli pas les conditions, on return juste le post
                return post;
            });

        case UNLIKE_POST:
            //on map sur tout les post pour trouver le bon
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        //on retourne le post
                        ...post,
                        //on filtres l'id le tableau des likers pour retirer l'id de la personne
                        likers: post.likers.filter(
                            (id) => id !== action.payload.userId
                        ),
                    };
                }
                return post;
            });
        case UPDATE_POST:
            //on cherche le post, et on verifie qu'il correspond a l'id
            //puis on retourne le post avec le message
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        message: action.payload.message,
                    };
                } else return post;
            });

        case EDIT_COMMENT:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        comments: post.comments.map((comment) => {
                            if (comment._id === action.payload.commentId) {
                                return {
                                    ...comment,
                                    text: action.payload.text,
                                };
                            } else {
                                return comment;
                            }
                        }),
                    };
                } else return post;
            });
        case DELETE_COMMENT:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        comments: post.comments.filter(
                            (comment) =>
                                comment._id !== action.payload.commentId
                        ),
                    };
                } else return post;
            });
        default:
            return state;
    }
}
