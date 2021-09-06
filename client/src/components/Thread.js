import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import { isEmpty } from "../Utils.js";
import Card from "./Card.js";

//POUR AFFICHER TOUT LES POSTS
const Thread = () => {
    //function pour charger les posts
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    //on recupère les posts de notre store
    const posts = useSelector((state) => state.postReducer);

    //quand on lance le comp, on recup tous les posts
    useEffect(() => {
        //si load post est sur true alors je recup les posts
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false);
        }
    }, [loadPost, dispatch]);

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
