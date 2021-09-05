import axios from "axios";

export const GET_USERS = "GET_USERS";

//on veut recup tout les utilisateur spour pouvoir les afficher dans les abonnements du profil
export const getUsers = () => {
    return (dispatch) => {
        return (
            axios
                //je vais recuperer les users dans ma bdd
                .get(`${process.env.REACT_APP_API_URL}api/user/`)
                //je les dispatch dans mon store pour pouvoir les utiliser partout
                //mes datas seront stockés dans mon payload
                .then((res) => {
                    dispatch({ type: GET_USERS, payload: res.data });
                })
                .catch((err) => console.log(err))
        );
    };
};
