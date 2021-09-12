import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTrends } from "../actions/post.actions";
import { isEmpty } from "../Utils";

const Trends = () => {
    //on a besoin de recup tout nos posts
    const posts = useSelector((state) => state.allPostsReducer);
    //on doit aussi recupéré la data de l'utilisateur car on va afficher sa photo de profil
    const usersData = useSelector((state) => state.usersReducer);
    const trendList = useSelector((state) => state.trendingReducer);

    //on envoie notre trends au store pour qu'il s'actualise en temps réel
    const dispatch = useDispatch();
    //lorsqu'on va appeler le comp, on lance cette function
    useEffect(() => {
        //si il y'a quelque chose alors
        if (!isEmpty(posts[0])) {
            //on transforme tout nos posts en array pour ensuite pouvoir trier
            //en gros on se recup nos post sous forme d'array
            const postsArr = Object.keys(posts).map((i) => posts[i]);
            //on trie du plus aimé au moins aimé
            let sortedArray = postsArr.sort((a, b) => {
                return b.likers.length - a.likers.length;
            });
            //on veut en afficher que trois
            sortedArray.length = 3;
            //lorsque l'action sera declenché on recupère les trends et on les trie
            dispatch(getTrends(sortedArray));
            //on relance à chaque fois la function pour que ça s'actualise toujours
        }
    }, [posts, dispatch]);
    return (
        <div className="trending-container">
            <h4 className="trending"> Trending</h4>
            <NavLink exact to="/trending">
                <ul>
                    {" "}
                    {trendList.length &&
                        //on map pour afficher post par post
                        trendList.map((post) => {
                            return (
                                <li className="trending_list" key={post._id}>
                                    <div>
                                        {/* on affiche soit la photo, soit la video soit la photo de profil */}
                                        {post.picture && (
                                            <img
                                                src={post.picture}
                                                alt="post-pic"
                                            />
                                        )}
                                        {post.video && (
                                            <iframe
                                                src={post.video}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={post._id}
                                            ></iframe>
                                        )}
                                        {/*si il n'ya ni photo ni video on affiche la phoyo de profil */}
                                        {isEmpty(post.picture) &&
                                            isEmpty(post.video) && (
                                                <img
                                                    src={
                                                        usersData[0] &&
                                                        usersData
                                                            //on map pour trouver notre user, si l'id de celui qui a posté correspond a celui de l'user trouvé alors on affiche sa photo de profil
                                                            .map((user) => {
                                                                if (
                                                                    user._id ===
                                                                    post.posterId
                                                                ) {
                                                                    return user.picture;
                                                                } else
                                                                    return null;
                                                            })
                                                            .join("")
                                                    }
                                                    alt="profil-pic"
                                                />
                                            )}
                                    </div>
                                    {/*on affiche le message dans tout les cas */}
                                    <div className="trend-content">
                                        <p>{post.message}</p>
                                        <span>Lire</span>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </NavLink>
        </div>
    );
};

export default Trends;
