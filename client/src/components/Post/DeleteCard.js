import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions.js";

const DeleteCard = (props) => {
    const dispatch = useDispatch();

    //function pour supprimer
    //on appelle notre action deletePost avec en params l'id
    const deleteQuote = () => dispatch(deletePost(props.id));

    <div
        onClick={() => {
            //au click on lui demande de confirmer son intention de supprimé le post

            if (window.confirm("Voulez-vous vraiment supprimer ce post?")) {
                //si la personne click sur ok alors on lance la function "deleteQuote"
                deleteQuote();
            }
        }}
    >
        <img src="./img/icons/trash.svg" alt="trash" />
    </div>;
};

export default DeleteCard;
