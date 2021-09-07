import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../Utils.js";

const NewPostForm = () => {
    //pour le chargement de la page
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState("");
    const [file, setFile] = useState("");
    const userData = useSelector((state) => state.userReducer);

    //on verifie que notre userData ne soit pas vide, si il ne l'est pas alors on passe notre loading sur false
    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);
        //on relance notre useEffect dès que la data evolue
    }, [userData]);

    return (
        <div className="post-container">
            {/*si "isloading" est sur true alors on affiche l'icon de chargement, fa-pulse permet de la faire tourner */}
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"> </i>
            ) : (
                <>
                    {/*ici on va mettre les données de notre user*/}
                    <div className="data">
                        {/*on verifie comme d'habitude que notre userData existe, si oui on affiche le nombre de followers*/}
                        <p>
                            <span>
                                {userData.following
                                    ? userData.following.length
                                    : 0}
                            </span>{" "}
                            {""}
                            {/*on rajoute un s si on a plusieurs followers (supérieur a 1)*/}
                            Abonnement
                            {userData.following && userData.following.length > 1
                                ? "s"
                                : ""}
                        </p>
                        <p>
                            <span>
                                {userData.followers
                                    ? userData.followers.length
                                    : 0}
                            </span>{" "}
                            {""}
                            {/*on rajoute un s si on a plusieurs followers (supérieur a 1)*/}
                            Abonné
                            {userData.followers && userData.followers.length > 1
                                ? "s"
                                : ""}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;
