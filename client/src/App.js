import axios from "axios";
import React, { useEffect, useState } from "react";
import Routes from "../src/components/Routes";
import { UidContext } from "./components/AppContext.js";

// On veut stocker l'id de notre utilisateur
const App = () => {
    const [uid, setUid] = useState(null);
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
    }, [uid]);
    return (
        // des qu'on appellera UidContext, on aura l'id de notre utilisateur
        <UidContext.Provider value={uid}>
            <Routes />
        </UidContext.Provider>
    );
};

export default App;
