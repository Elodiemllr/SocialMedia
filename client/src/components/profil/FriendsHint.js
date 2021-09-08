import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../Utils.js";
import FollowHandler from "./FollowHandler.js";

const FriendsHint = () => {
    //quand on a pas la data on met le ptit chargement
    const [isLoading, setIsLoading] = useState(true);
    //pour pouvoir le faire qu'une fois
    const [playOnce, setPlayOnce] = useState(true);
    //on stock toutes les suggestion ici
    const [friendsHint, setFriendsHint] = useState([]);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    //ceux avec qui on est pas amie

    useEffect(() => {
        const notFriendList = () => {
            let array = [];
            //On map notre liste d'users pour voir ceux qui ne sont pas amis avec nous
            usersData.map((user) => {
                //on met une condition pour ne pas s'auto ajouter
                //et l'id des users ne doit pas être present dans le tableau des followers
                if (
                    user._id !== userData._id &&
                    !user.followers.includes(userData._id)
                )
                    return array.push(user._id);
            });
            //on trie de facon alléatoire à chaque chargement
            array.sort(() => 0.5 - Math.random());
            if (window.innerHeight > 780) {
                array.length = 7;
            } else if (window.innerHeight > 720) {
                array.length = 4;
            } else if (window.innerHeight > 615) {
                array.length = 2;
            } else if (window.innerHeight > 540) {
                array.length = 1;
            } else {
                array.length = 0;
            }
            //et on incrémente notre array
            setFriendsHint(array);
        };

        //si Playonce est sur true et que notre user data n'est pas vide et que l'id du user
        //existe alors on lance notre fonction juste au dessus et on enlève notre loading et on ne fait plus de playonce
        if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
            notFriendList();
            setIsLoading(false);
            setPlayOnce(false);
        }
    }, [usersData, userData, playOnce]);

    return (
        <div className="get-friends-container">
            <h4>Suggestions</h4>
            {isLoading ? (
                <div className="icon">
                    <i className="fas fa-spinner fa-pulse"></i>
                </div>
            ) : (
                <ul>
                    {/*si ça existe alors on affiche notre liste et les infos de l'user qui correspond [i]   */}
                    {friendsHint &&
                        friendsHint.map((user) => {
                            for (let i = 0; i < usersData.length; i++) {
                                if (user === usersData[i]._id) {
                                    return (
                                        <li className="user-hint" key={user}>
                                            <img
                                                src={usersData[i].picture}
                                                alt="user-pic"
                                            />
                                            <p>{usersData[i].pseudo}</p>
                                            <FollowHandler
                                                idToFollow={usersData[i]._id}
                                                type={"suggestion"}
                                            />
                                        </li>
                                    );
                                }
                            }
                        })}
                </ul>
            )}
        </div>
    );
};

export default FriendsHint;
