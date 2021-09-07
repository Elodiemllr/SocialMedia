import axios from "axios";

//posts
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";

//on passe num en paramètres, pour dans notre const array lui dire d'aller jusqu'au "num" (soit 5) avec la méthode slice
export const getPosts = (num) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`)
            .then((res) => {
                const array = res.data.slice(0, num);
                dispatch({ type: GET_POSTS, payload: array });
            })
            .catch((err) => console.log(err));
    };
};

//on passe en params l'id de l'user qui a liké et l"id de celui qui reçoit le like
export const likePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
            data: { id: userId },
        })
            .then((res) => {
                dispatch({ type: LIKE_POST, payload: { postId, userId } });
            })
            .catch((err) => console.log(err));
    };
};

export const unlikePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url:
                `${process.env.REACT_APP_API_URL}api/post/unlike-post/` +
                postId,
            data: { id: userId },
        })
            .then((res) => {
                dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
            })
            .catch((err) => console.log(err));
    };
};

export const updatePost = (postId, message) => {
    return (dispatch) => {
        //on fait un "pu" pour envoyer le message à notre api suivant l'id de notre user
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data: { message },
        }) //on dispatch le message et l'id de celui qui post
            .then((res) => {
                dispatch({ type: UPDATE_POST, payload: { message, postId } });
            })
            .catch((err) => console.log(err));
    };
};
