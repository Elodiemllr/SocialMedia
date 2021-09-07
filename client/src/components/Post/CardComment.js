import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../Utils.js";

const CardComments = ({ post }) => {
    //pour stocker le commentaire
    const [text, setText] = useState("");
    //on recupère toutes les datas de nos utilisateurs
    const usersData = useSelector((state) => state.usersReducer);
    // et celle de l'utilisateur concerné
    const userData = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();

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
                    </div>
                );
            })}
        </div>
    );
};
export default CardComments;
