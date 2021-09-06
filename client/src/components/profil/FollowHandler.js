import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/user.actions.js";
import { isEmpty } from "../../Utils.js";

const FollowHandler = ({ idToFollow }) => {
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
                    <button className="unfollow-btn"> Abonné</button>
                </span>
            )}
            {isFollowed === false && !isEmpty(userData) && (
                // au click on lance la function pour s'abonner

                <span onClick={handleFollow}>
                    <button className="follow-btn"> suivre</button>
                </span>
            )}
        </>
    );
};

export default FollowHandler;
