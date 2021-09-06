import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/user.actions.js";
import { isEmpty } from "../../Utils.js";

const FollowHandler = ({ idToFollow, type }) => {
    //on recup les données qui sont deja stockés dans notre store
    const userData = useSelector((state) => state.userReducer);
    //pour changer l'état visu et passer de follow a unfollow
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    //fonction handle follow pour suivre
    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow));
        setIsFollowed(true);
    };

    //fonction handle follow pour plus suivre
    const handleUnfollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow));
        setIsFollowed(false);
    };

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
            {isFollowed && !isEmpty(userData) && (
                // au click on lance la function pour se désabonner
                <span onClick={handleUnfollow}>
                    {" "}
                    {/*l'icon change suivant le type d'affichage, le type sera mentionné dans la balise 'followhandler' dans notre updateProfil par exemple*/}
                    {type === "suggestion" && (
                        <button className="unfollow-btn">Abonné</button>
                    )}
                    {type === "card" && (
                        <img src="./img/icons/checked.svg" alt="checked" />
                    )}
                </span>
            )}
            {isFollowed === false && !isEmpty(userData) && (
                // au click on lance la function pour s'abonner

                <span onClick={handleFollow}>
                    {type === "suggestion" && (
                        <button className="follow-btn">Suivre</button>
                    )}
                    {type === "card" && (
                        <img src="./img/icons/check.svg" alt="check" />
                    )}
                </span>
            )}
        </>
    );
};

export default FollowHandler;
