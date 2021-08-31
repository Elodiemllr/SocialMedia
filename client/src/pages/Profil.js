import React, { useContext } from "react";
import { UidContext } from "../components/AppContext.js";
import Log from "../components/log";

//ici je renvoie tout ce qu'il concerne le profil alors que dans components je fais des comp individuel
const Profil = () => {
    // on saura si notre user est connecté, et si il l'est alors on ne montre pas le comp de connexion mais celle pour edit sont profil
    const uid = useContext(UidContext);
    return (
        <div className="profil-page">
            {/*Si notre user est connecté : envoie sur update page*/}
            {uid ? (
                <h1> UPDATE PAGE </h1>
            ) : (
                /* sinon on lui renvoie la page de base*/
                <div className="log-container">
                    <Log signin={false} signup={true} />
                    <div className="img-container">
                        <img src="./img/log.svg" alt="img" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profil;
