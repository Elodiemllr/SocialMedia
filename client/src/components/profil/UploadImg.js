import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions.js";

const UploadImg = () => {
    const [file, setFile] = useState();
    //dispatch nous permet de declencher une action
    const dispatch = useDispatch();
    //pour recuperer les données de notre user
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = (e) => {
        e.preventDefault();
        //quand on soumet le formulaire =>
        //new FormData est un objet de js qui va nous permettre de mettre notre image + des infos dans notre data qu'on enverra ensuite
        const data = new FormData();
        //   avec append on ratache des élements à notre const data
        //  on fournit à data 'name', qui sera dans notre userData sous "pseudo" et le userId
        data.append("name", userData.pseudo);
        //pour retrouver notre user
        data.append("userId", userData._id);
        //ici sera ce que contient notre const file
        data.append("file", file);

        //puis on declenche une action qui s'apelle uploadPicture et on lui passe en params notre const data
        dispatch(uploadPicture(data, userData._id));
    };
    return (
        <form action="" onSubmit={handlePicture} className="upload-pic">
            <label htmlFor="file"> Changer d'image </label>

            <input
                className="input_img"
                type="file"
                id="file"
                name="file"
                //Pour lui indiquer visuellement les fichier qu'il peut telecharger
                accept=".jpg, .jpeg, .png"
                //on va stocker dans la variable setFile ce qu'il y'aura dans notre input
                onChange={(e) => setFile(e.target.files[0])}
            />
            <br />
            <input type="submit" value="envoyer" />
            <br />
        </form>
    );
};

export default UploadImg;
