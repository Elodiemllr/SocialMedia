//pour pouvoir aller cherchr nos donnes
import axios from "axios";

//je créer une action et sa fonction qui est de recup les infos de mon utilisateur
export const GET_USER = "GET_USER";

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
