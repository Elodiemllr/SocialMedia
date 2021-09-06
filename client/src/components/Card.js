import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dateParser, { isEmpty } from "../Utils.js";
//comp individuel pour un post (mit dans le thread)

//on se recupère les données dans "posts"
const Card = ({ post }) => {
    //tant qu'on a pas la data de notre card, on met un "loading"
    const [isLoading, setIsLoading] = useState(true);

    //on recupère toutes les datas de nos utilisateurs
    const usersData = useSelector((state) => state.usersReducer);
    // et celle de l'utilisateur concerné
    const userData = useSelector((state) => state.userReducer);

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
                                    {" "}
                                    {!isEmpty(usersData[0]) &&
                                        usersData
                                            .map((user) => {
                                                if (user._id === post.posterId)
                                                    return user.pseudo;
                                                else return null;
                                            })
                                            .join("")}
                                </h3>
                            </div>
                            {/*On veut affcher la date */}
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;
