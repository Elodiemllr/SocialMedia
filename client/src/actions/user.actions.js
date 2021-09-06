//pour pouvoir aller cherchr nos donnes
import axios from "axios";

//je créer une action et sa fonction qui est de recup les infos de mon utilisateur
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "update_bio";
export const FOLLOW_USER = "follow_user";
export const UNFOLLOW_USER = "unfollow_user";

export const getUser = (uid) => {
    //dispatch = ce qu'on envoie au reducer pour lui dire quoi mettre dans le store
    return (dispatch) => {
        //on veut les infos de notre user par rapport a son id
        return (
            axios
                .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
                // puis on dispatch
                .then((res) => {
                    //payload = "ce qu'on t'envoie".
                    //  Là on lui envoie la data reçu
                    dispatch({ type: GET_USER, payload: res.data });
                })
                .catch((err) => console.log(err))
        );
    };
};

export const uploadPicture = (data, id) => {
    //dispatch = ce qu'on envoie au reducer pour lui dire quoi mettre dans le store
    return (dispatch) => {
        //on envoie la data à notre bdd
        return (
            axios
                .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
                //on avertie notre reducer pour qu'il change le store avec nos nouvelles données
                .then((res) => {
                    return axios
                        .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                        .then((res) => {
                            dispatch({
                                type: UPLOAD_PICTURE,
                                payload: res.data.picture,
                            });
                        });
                })
                .catch((err) => console.log(err))
        );
    };
};

//id pour l'identifier, bio..pour la bio
export const updateBio = (userId, bio) => {
    return (dispatch) => {
        return axios
            .put(`${process.env.REACT_APP_API_URL}api/user/${userId}`, bio)
            .then((res) => {
                dispatch({
                    type: UPDATE_BIO,
                    payload: bio,
                });
            })
            .catch((err) => console.log(err));
    };
};

//on reprends le sinfos du back en params (on a besoin de l'id de la personne a suivre, et celle qui est concerné )
export const followUser = (followerId, idToFollow) => {
    //dispatch = ce qu'on envoie au reducer pour lui dire quoi mettre dans le store
    return (dispatch) => {
        //on envoie la data à notre bdd
        return (
            axios({
                method: "patch",
                url:
                    `${process.env.REACT_APP_API_URL}api/user/follow/` +
                    followerId,
                data: { idToFollow },
            })
                //on avertie notre reducer pour qu'il change le store avec nos nouvelles données
                .then((res) => {
                    dispatch({ type: FOLLOW_USER, payload: { idToFollow } });
                })
                .catch((err) => console.log(err))
        );
    };
};

export const unfollowUser = (followerId, idToUnfollow) => {
    //dispatch = ce qu'on envoie au reducer pour lui dire quoi mettre dans le store
    return (dispatch) => {
        //on envoie la data à notre bdd
        return (
            axios({
                method: "patch",
                url:
                    `${process.env.REACT_APP_API_URL}api/user/unfollow/` +
                    followerId,
                data: { idToUnfollow },
            })
                //on avertie notre reducer pour qu'il change le store avec nos nouvelles données
                .then((res) => {
                    dispatch({
                        type: UNFOLLOW_USER,
                        payload: { idToUnfollow },
                    });
                })
                .catch((err) => console.log(err))
        );
    };
};
