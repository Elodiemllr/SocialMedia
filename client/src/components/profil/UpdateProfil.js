import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.actions.js";
import dateParser from "../../Utils.js";
import LeftNavBar from "../Routes/LetNavBar.js";
import UploadImg from "./UploadImg.js";

const UpdateProfil = () => {
    //pour changer la bio
    //pour changer notre form en input ou en normal au click
    const [updateForm, setUpdateForm] = useState(false);
    const [bio, setBio] = useState("");
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    const dispatch = useDispatch();
    const [followingPopUp, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);

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
                    <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
                    <h5 onClick={() => setFollowingPopup(true)}>
                        {/* si il a bien réussi a avoir les data "following" alors on lui demande d'afficher la longueur (le nombre) de followers*/}
                        {/**? si : sinon/ */}
                        Abonnements :
                        {userData.following ? userData.following.length : ""}
                    </h5>
                    <h5 onClick={() => setFollowersPopup(true)}>
                        Abonnées :
                        {userData.followers ? userData.followers.length : ""}
                    </h5>
                </div>
            </div>
            {/*Si followers pop est sur true alors on execute cette affichage */}
            {followersPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnés</h3>
                        <span
                            className="cross"
                            onClick={() => setFollowersPopup(false)}
                        >
                            &#10005;
                        </span>
                        {/*on veut afficher les abonnés  */}
                    </div>
                </div>
            )}
            {followingPopUp && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnements</h3>
                        <span
                            className="cross"
                            onClick={() => setFollowingPopup(false)}
                        >
                            &#10005;
                        </span>
                        <ul>
                            {usersData.map((user) => {
                                //on boucle pour afficher tout les following présent chez notre user
                                for (
                                    let i = 0;
                                    i < userData.following.length;
                                    i++
                                ) {
                                    if (user._id === userData.following[i]) {
                                        //puis on veut retourner sa photo, son nom d'user  et son nombre de follower
                                        return (
                                            <li key={user._id}>
                                                <img
                                                    src={user.picture}
                                                    alt="user-pic"
                                                />
                                                <h4> {user.pseudo} </h4>
                                                <h1>FOLLOWERS</h1>
                                            </li>
                                        );
                                    }
                                }
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProfil;
