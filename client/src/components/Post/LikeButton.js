import React, { useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { UidContext } from "../AppContext.js";

const LikeButton = ({ post }) => {
    //voir si ça a déjà été liké ou pas
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);

    const like = () => {};

    const unlike = () => {};

    useEffect(() => {
        //post.likers regroupent l'id de tout les likers. on voit si l'id de notre users est dans ce tableau
        if (post.likers.includes(uid)) setLiked(true);
        //on relance notre useEffect après ses trois possibilités
    }, [uid, post.likers, liked]);
    return (
        <div className="like-container">
            {/*on test si on a bien l'id de notre user (si il est co) */}
            {/*si il n'est pas co, alors on affiche une pop up de reactjs-popup pour lui indiquer qu'il n'est pas co */}
            {uid === null && (
                <Popup
                    trigger={<img src="./img/icons/heart.svg" alt="like" />}
                    position={["bottom center", "bottom right", "bottom left"]}
                    closeOnDocumentClick
                >
                    <div> Connectez-vous pour aimer un post !</div>
                </Popup>
            )}
            {uid && liked === false && (
                <img src="./img/icons/heart.svg" onClick={like} alt="like" />
            )}
            {uid && liked && (
                <img
                    src="./img/icons/heart-filled.svg"
                    onClick={unlike}
                    alt="unlike"
                />
            )}
        </div>
    );
};

export default LikeButton;
