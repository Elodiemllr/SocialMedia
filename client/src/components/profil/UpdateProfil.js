import React from "react";
import { useSelector } from "react-redux";
import LeftNavBar from "../Routes/LetNavBar.js";
import UploadImg from "./UploadImg.js";

const UpdateProfil = () => {
    const userData = useSelector((state) => state.userReducer);
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
            </div>
        </div>
    );
};

export default UpdateProfil;
