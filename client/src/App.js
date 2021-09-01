import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Routes from "../src/components/Routes";
import { getUser } from "./actions/user.actions.js";
import { UidContext } from "./components/AppContext.js";

//on veut verifier si notre user est connecté grace au token à l'initialisation de notre app
const App = () => {
    const [uid, setUid] = useState(null);
    //dispatch nous permet de declencher une action
    const dispatch = useDispatch();
    //dès qu'on appelle APP (des qu'on arrive sur notre application) on lance ce useEffect
    // on get requireAuth qui nous permet de verifier lors de la premier id le token de notre user
    useEffect(() => {
        const fetchToken = async () => {
            await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}jwtid`,
                //pas de data a passer car c'est un get
                withCredentials: true,
            })
                .then((res) => {
                    setUid(res.data);
                })
                .catch((err) => console.log("No Token"));
        };
        fetchToken();
        //a chaque fois que uid evolue, on relance le useEffect

        //si l'id existe alors on va dispatch getUser (on declenche l'action) afin de recup les infos
        if (uid) dispatch(getUser(uid));
    }, [uid, dispatch]);
    return (
        // des qu'on appellera UidContext, on aura l'id de notre utilisateur
        <UidContext.Provider value={uid}>
            <Routes />
        </UidContext.Provider>
    );
};

export default App;
