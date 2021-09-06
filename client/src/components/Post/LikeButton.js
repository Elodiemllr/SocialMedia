import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { likePost, unlikePost } from "../../actions/post.actions.js";
import { UidContext } from "../AppContext.js";

const LikeButton = ({ post }) => {
    //voir si ça a déjà été liké ou pas
    const [liked, setLiked] = useState(false);

    const uid = useContext(UidContext);

    const dispatch = useDispatch();

    const like = () => {
        dispatch(likePost(post._id, uid));
        setLiked(true);
    };

    const unlike = () => {
        dispatch(unlikePost(post._id, uid));
        setLiked(false);
    };

    useEffect(() => {
        //post.likers regroupent l'id de tout les likers. on voit si l'id de notre users est dans ce tableau
        if (post.likers.includes(uid)) setLiked(true);
        else setLiked(false);

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
