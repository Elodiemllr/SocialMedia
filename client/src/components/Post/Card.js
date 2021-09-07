import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.actions.js";
import dateParser, { isEmpty } from "../../Utils.js";
import FollowHandler from "../profil/FollowHandler.js";
import CardComments from "./CardComment.js";
import DeleteCard from "./DeleteCard.js";
import LikeButton from "./LikeButton.js";
//comp individuel pour un post (mit dans le thread)

//on se recupère les données dans "posts"
const Card = ({ post }) => {
    //tant qu'on a pas la data de notre card, on met un "loading"
    const [isLoading, setIsLoading] = useState(true);
    //si on click sur le bouton pour faire l'update de notre message dans le feel d'actu
    const [isUpdated, setIsUpdated] = useState();
    //le message update
    const [textUpdate, setTextUpdate] = useState(false);

    //pour l'icon du commentaire (afficher ou pas les comm's)
    const [showComments, setShowComments] = useState(false);

    //on recupère toutes les datas de nos utilisateurs
    const usersData = useSelector((state) => state.usersReducer);
    // et celle de l'utilisateur concerné
    const userData = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();
    //pour declencher notre action qui modifiera le msg
    const updateItem = async () => {
        //si textUpdate contient quelque chose (si il y'a quelque chose qui a changé)
        if (textUpdate) {
            await dispatch(updatePost(post._id, textUpdate));
        }
        //quand c'est actualisé on repasse sur false pour revenir à l'état normal
        setIsUpdated(false);
    };

    //on enlève le chargement lorsqu'on a quelque chose a afficher
    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);

    return (
        <li className="card-container" key={post._id}>
            {/*si "isLoading" est sur true, alors on met la classe fas fa-spinner */}
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                //sinon on r'envoie notre visu de card
                <>
                    <div className="card-left">
                        {/* on map pour retrouver la photo de l'utilisateur et si on la trouve on return sa photo  */}
                        <img
                            src={
                                !isEmpty(usersData[0]) &&
                                usersData
                                    .map((user) => {
                                        if (user._id === post.posterId)
                                            return user.picture;
                                        else return null;
                                    })
                                    .join("")
                            }
                            alt="user-pic"
                        />
                    </div>
                    {/*on veut maintenant le nom de l'user */}
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                {/*on remap comme au dessus mais cette fois pour le pseudo*/}
                                <h3>
                                    {!isEmpty(usersData[0]) &&
                                        usersData
                                            .map((user) => {
                                                if (user._id === post.posterId)
                                                    return user.pseudo;
                                                else return null;
                                            })
                                            .join("")}
                                </h3>
                                {post.posterId !== userData._id && (
                                    <FollowHandler
                                        idToFollow={post.posterId}
                                        type={"card"}
                                    />
                                )}
                            </div>
                            {/*On veut affcher la date */}
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        {/*Puis on affiche le message et une photo si il y'en a une  */}
                        {/*si isUpdated est sur fals alors on affiche le message de base */}
                        {isUpdated === false && <p>{post.message}</p>}
                        {/*si il est sur true, alors */}
                        {isUpdated && (
                            <div className="update-post">
                                {/*sur le textarea on met une valeur par defaut qui sera notre text de base, et au changement on passe a setTextUpdate la valeur entrée dans notre input  */}
                                <textarea
                                    defaultValue={post.message}
                                    onChange={(e) =>
                                        setTextUpdate(e.target.value)
                                    }
                                />
                                <div className="button-container">
                                    {/* au click on fait la function update l'item , qui declenchera toutes notre actions */}
                                    <button
                                        className="btn"
                                        onClick={updateItem}
                                    >
                                        Valider les modificaions
                                    </button>
                                </div>
                            </div>
                        )}

                        {post.picture && (
                            <img
                                src={post.picture}
                                alt="card-pic"
                                className="card-pic"
                            />
                        )}
                        {/*idem pour les vidéos  */}
                        {post.video && (
                            <iframe
                                width="500"
                                height="300"
                                src={post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={post._id}
                            ></iframe>
                        )}
                        {/*Pour modifier son propre post seulement */}
                        {userData._id === post.posterId && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img
                                        src="./img/icons/edit.svg"
                                        alt="edit"
                                    />
                                </div>
                                {/*on donne la possibilité à l'utilisateur de supp son msg*/}
                                <DeleteCard id={post._id}></DeleteCard>
                            </div>
                        )}
                        <div className="card-footer">
                            {/* icon de commentaire avec le nombre */}
                            <div className="comment-icon">
                                <img // au click sur l'icon, on passe showComments sur true
                                    onClick={() =>
                                        setShowComments(!showComments)
                                    }
                                    src="./img/icons/message1.svg"
                                    alt="comment"
                                />
                                <span> {post.comments.length}</span>
                            </div>
                            {/*icon de like*/}
                            <LikeButton post={post} />
                            <img src="./img/icons/share.svg" alt="share" />
                        </div>
                        {/* si showComments est sur true alors on declenche CardComments*/}
                        {showComments && <CardComments post={post} />}
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;
