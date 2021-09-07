import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext.js";

const EditDeleteComment = (comment, postId) => {
    //pour passer isAuthor sur true si notre checkAuthor est bon
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");

    const uid = useContext(UidContext);

    //fonction pour edit
    const handleEdit = () => {};

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
            {edit === false && (
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
                        onChang={(e) => setText(e.target.value)}
                        defaultValue={comment.text}
                    ></input>
                </form>
            )}
        </div>
    );
};

export default EditDeleteComment;
