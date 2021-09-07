import axios from "axios";

//posts
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

//comments
export const ADD_COMMENT = "ADD_COMMENT";

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
        //on fait un "put" pour envoyer le message à notre api suivant l'id de notre user
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

//elle a besoin du post ID en params pour savoir lequel supprimer
export const deletePost = (postId) => {
    return (dispatch) => {
        //on fait un "delete" pour supprimer le post
        return axios({
            //suppression dans la base de données
            method: "delete",
            //url du post a supprimé
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
        }) //on dispatch le message et l'id de celui qui post
            .then((res) => {
                //mise à jour dans le store
                dispatch({ type: DELETE_POST, payload: { postId } });
            })
            .catch((err) => console.log(err));
    };
};

export const addComment = (postId, commenterId, text, commenterPseudo) => {
    return (dispatch) => {
        //on patch (ajoute) dans notre bdd le commentaire par rapport au postId (on ajoute l'id du commentateur, le text et son pseudo )
        return (
            axios({
                method: "patch",
                url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
                data: { commenterId, text, commenterPseudo },
            })
                //on met à jour dans notre store
                .then((res) => {
                    dispatch({ type: ADD_COMMENT, payload: { postId } });
                })
                .catch((err) => console.log(err))
        );
    };
};
