import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.actions.js";
import LeftNavBar from "../Routes/LetNavBar.js";
import UploadImg from "./UploadImg.js";

const UpdateProfil = () => {
    //pour changer la bio
    //pour changer notre form en input ou en normal au click
    const [updateForm, setUpdateForm] = useState(false);
    const [bio, setBio] = useState("");
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const handleUpdate = (e) => {
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(false);
    };

    return (
        <div className="profil-container">
            <LeftNavBar></LeftNavBar>
            <h1> Profil de {userData.pseudo} </h1>
            <div className="update-container">
                <div className="left-part">
                    <h3> Photo de profil </h3>
                    <img src={userData.picture} alt="user-pic"></img>
                    <UploadImg />

                    {/* <p> {errors.maxSize}</p>
                    <p> {errors.format}</p>*/}
                </div>
                <div className="right-part">
                    <div className="bio-update">
                        <h3> BIO </h3>
                        {/*Si update form est sur false */}
                        {updateForm === false && (
                            <>
                                {/*On r'envoie notre bio mais si il click alors il peut update et on passe notre form a true*/}
                                <p onClick={() => setUpdateForm(!updateForm)}>
                                    {userData.bio}
                                </p>
                                {/*pareil qu'au dessus, au click sur le bouton passe passe notre form true*/}
                                <button
                                    onClick={() => setUpdateForm(!updateForm)}
                                >
                                    Modifier la bio
                                </button>
                            </>
                        )}
                        {updateForm && (
                            <>
                                <textarea
                                    type="text"
                                    defaultValue={userData.bio}
                                    onChange={(e) => setBio(e.target.value)}
                                ></textarea>
                                <button onClick={handleUpdate}>
                                    Valider les modifications
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfil;
