import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editComment } from "../../actions/post.actions";
import { UidContext } from "../AppContext";

const EditDeleteComment = ({ comment, postId }) => {
    //pour passer isAuthor sur true si notre checkAuthor est bon
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    //pour supp
    const handleDelete = () => dispatch();

    //fonction pour edit
    const handleEdit = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(editComment(postId, comment._id, text));
            setText("");
            setEdit(false);
        }
    };

    //on Verifie que notre utilisateur soit bien celui qui a commenté
    //si il est sur true alors on affiche la div edit-comment
    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.commenterId) {
                setIsAuthor(true);
            }
        };
        checkAuthor();
    }, [uid, comment.commenterId]);

    return (
        <div className="edit-comment">
            {/*si on trouve l'auteur et que l'edit est sur false alors on affiche le bouton d'édit */}
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <img src="./img/icons/edit.svg" alt="edit-comment" />
                </span>
            )}
            {isAuthor && edit && (
                <form
                    action=""
                    onSubmit={handleEdit}
                    className="edit-comment-form"
                >
                    <label htmlFor="text" onClick={() => setEdit(!edit)}>
                        Editer
                    </label>
                    <br />
                    <input
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={comment.text}
                    />
                    <br />
                    <div className="btn">
                        <span
                            onClick={() => {
                                if (
                                    window.confirm(
                                        "Voulez-vous supprimer ce commentaire ?"
                                    )
                                ) {
                                    handleDelete();
                                }
                            }}
                        >
                            <img src="./img/icons/trash.svg" alt="delete" />
                        </span>
                        <input type="submit" value="Valider modification" />
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditDeleteComment;
