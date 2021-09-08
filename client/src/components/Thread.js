import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import { isEmpty } from "../Utils.js";
import Card from "./Post/Card.js";

//POUR AFFICHER TOUT LES POSTS
const Thread = () => {
    //function pour charger les posts
    const [loadPost, setLoadPost] = useState(true);
    //pour nos post, pour la scroll
    const [count, setCount] = useState(5);

    const dispatch = useDispatch();
    //on recupère les posts de notre store
    const posts = useSelector((state) => state.postReducer);
    const loadMore = () => {
        // "si tu es en bas de la page "
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >
            document.scrollingElement.scrollHeight
        ) {
            //on pass loadPost sur true alors on relance le count
            setLoadPost(true);
        }
    };
    //quand on lance le comp, on recup tous les posts
    useEffect(() => {
        //si load post est sur true alors je recup les posts
        if (loadPost) {
            //on getPosts jusqu'a count(soit 5)
            dispatch(getPosts(count));
            setLoadPost(false);
            //on r'ajoute +5
            setCount(count + 5);
        }
        //dès qu'il y'a un scroll, je lance la fonction pour  afficher 5 posts de plus
        window.addEventListener("scroll", loadMore);
        return () => {
            //
            window.removeEventListener("scroll", loadMore);
        };
    }, [loadPost, dispatch, count]);

    return (
        <div className="thread-container">
            <ul>
                {/* si posts à son niveau "0" n'est pas "empty" alors on affiche la suite */}
                {!isEmpty(posts[0]) &&
                    // on map pour afficher tout nos posts
                    posts.map((post) => {
                        return <Card post={post} key={post._id}></Card>;
                    })}
            </ul>
        </div>
    );
};

export default Thread;
