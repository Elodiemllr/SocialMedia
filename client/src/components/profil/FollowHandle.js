import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../Utils.js";

const FollowHandle = ({ idToFollow }) => {
    //on recup les données qui sont deja stockés dans notre store
    const userData = useSelector((state) => state.userReducer);
    //pour changer l'état visu et passer de follow a unfollow
    const [isFollowed, setIsFollowed] = useState(false);

    //fonction handle follow pour suivre
    const handleFollow = () => {};

    //fonction handle follow pour plus suivre
    const handleUnollow = () => {};

    //Pour effectuer 'l'effet' une fois le rendu du comp terminé
    //Là, si notre userData.following n'est pas vite, alors on lancera la function
    useEffect(() => {
        if (!isEmpty(userData.following)) {
            //si on suit deja le user (id to follow)
            if (userData.following.includes(idToFollow)) {
                //alors on affiche un bouton pour pouvoir se désabonner (setIsFollowen sur true)
                setIsFollowed(true);
            } else setIsFollowed(false);
        }
    }, [userData, idToFollow]);

    return (
        <>
            {/*Si la personne est isFollowed alors on met le bouton "abonnée" */}
            {isFollowed && (
                <span>
                    <button className="unfollow-btn"> Abonné</button>
                </span>
            )}
            {isFollowed === false && (
                <span>
                    <button className="follow-btn"> suivre</button>
                </span>
            )}
        </>
    );
};

export default FollowHandle;
