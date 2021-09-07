import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions.js";
import { isEmpty, timestampParser } from "../../Utils.js";
import FollowHandler from "../profil/FollowHandler.js";
import EditDeleteComment from "./EditDeleteComment.js";

const CardComments = ({ post }) => {
    //pour stocker le commentaire
    const [text, setText] = useState("");
    //on recupère toutes les datas de nos utilisateurs
    const usersData = useSelector((state) => state.usersReducer);
    // et celle de l'utilisateur concerné
    const userData = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();

    //pour envoyer mon commentaire
    const handleComment = (e) => {
        e.preventDefault();
        if (text) {
            dispatch(addComment(post._id, userData._id, text, userData.pseudo))
                .then(() => dispatch(getPosts()))
                .then(() => setText(""));
        }
    };

    //on map pour afficher tous les commentaires
    return (
        <div className="comments-container">
            {post.comments.map((comment) => {
                return (
                    //on met une couleur de commentaire différente si c'est celle de notre user sinon on met la normal
                    <div
                        className={
                            comment.commenterId === userData._id
                                ? "comment-container client"
                                : "comment-container"
                        }
                        key={comment._id}
                    >
                        <div className="left-part">
                            {/* on joit la photo des users */}
                            <img
                                src={
                                    !isEmpty(usersData[0]) &&
                                    usersData
                                        .map((user) => {
                                            if (
                                                user._id === comment.commenterId
                                            )
                                                return user.picture;
                                            else return null;
                                        })
                                        .join("")
                                }
                                alt="commenter-pic"
                            ></img>
                        </div>
                        {/*sur la partie droite on mettra les commentaires, les pseudo , le follow handler etc */}
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{comment.commenterPseudo}</h3>
                                    {comment.commenterId !== userData._id && (
                                        <FollowHandler
                                            idToFollow={comment.commenterId}
                                            type={"card"}
                                        />
                                    )}
                                </div>
                                <span>
                                    {timestampParser(comment.timestamp)}
                                </span>
                            </div>
                            <p>{comment.text} </p>
                            {/* on porpose à notre user de delete ou d'edit son commentaire*/}
                            <EditDeleteComment
                                comment={comment}
                                postId={post._id}
                            />
                        </div>
                    </div>
                );
            })}
            {/*on ne propose de commenter seulement si l'user est connecté*/}
            {userData._id && (
                <form
                    action=""
                    onSubmit={handleComment}
                    className="comment-form"
                >
                    {/*au changement on se recup l'evenement et on lui passe la valeur dans notre set */}
                    <input
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        placeholder="Laisser un commentaire"
                    />
                    <br />
                    <input type="submit" value="Envoyer" />
                </form>
            )}
        </div>
    );
};
export default CardComments;
