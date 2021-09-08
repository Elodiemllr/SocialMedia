import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.actions.js";
import { isEmpty, timestampParser } from "../../Utils.js";

const NewPostForm = () => {
    const dispatch = useDispatch();
    //pour le chargement de la page
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    // ce qu'on va vouloir afficher niveau front
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState("");
    // ce qu'on va envoyer à la bdd
    const [file, setFile] = useState("");

    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.postError);

    const handlePost = async () => {
        //on délenche cette action seulement si on a quelque chose à envoyer
        if (message || postPicture || video) {
            const data = new FormData();
            //on ajoute le poster id dans notre data, le message etc
            data.append("posterId", userData._id);
            data.append("message", message);
            if (file) data.append("file", file);
            data.append("video", video);

            //on l'envoie à notre back avec l'action addPost
            await dispatch(addPost(data));
            //on recupère le nouveaux post
            dispatch(getPosts());
            //on remet tout a zéro
            cancelPost();
        } else {
            alert("Veuillez entrer un message");
        }
    };
    const handlePicture = (e) => {
        //on veut une prévisualisation immédiate
        //on incrémente postPicture et on lui passe l'url de notre photo pour pouvoir l'afficher
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        //on l'envoie à notre bdd
        setFile(e.target.files[0]);
        //ne pas oublié qu'on ne peut pas avoir de vidéo
        setVideo("");
    };

    const cancelPost = () => {
        //on passe tout sur des string vide / on annule tout
        setMessage("");
        setPostPicture("");
        setVideo("");
        setFile("");
    };

    //on verifie que notre userData ne soit pas vide, si il ne l'est pas alors on passe notre loading sur false
    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);
        const handleVideo = () => {
            // split replace join : methode JS
            //on se split tout notre message partie par partie;
            let findLink = message.split(" ");
            //on test chaque élement splité
            for (let i = 0; i < findLink.length; i++) {
                //si ça inclus 'https......' ou
                if (
                    findLink[i].includes("https://www.yout") ||
                    findLink[i].includes("https://yout")
                ) {
                    // on remplace replace('watch?v=' par  "embed/"
                    let embed = findLink[i].replace("watch?v=", "embed/");
                    //on coupe la partie de notre link après "&" pour ne pas poster une vidéo youtube dejà avancé dans le temps
                    setVideo(embed.split("&")[0]);
                    findLink.splice(i, 1);
                    setMessage(findLink.join(" "));
                    //si on a une photo alors on la supp
                    setPostPicture("");
                }
            }
        };

        handleVideo();
        //on relance notre useEffect dès que la data evolue ou message evolu
    }, [userData, message, video]);

    return (
        <div className="post-container">
            {/*si "isloading" est sur true alors on affiche l'icon de chargement, fa-pulse permet de la faire tourner */}
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"> </i>
            ) : (
                <>
                    {/*ici on va mettre les données de notre user*/}
                    <div className="data">
                        {/*on verifie comme d'habitude que notre userData existe, si oui on affiche le nombre de followers*/}
                        <p>
                            <span>
                                {userData.following
                                    ? userData.following.length
                                    : 0}
                            </span>{" "}
                            {""}
                            {/*on rajoute un s si on a plusieurs followers (supérieur a 1)*/}
                            Abonnement
                            {userData.following && userData.following.length > 1
                                ? "s"
                                : ""}
                        </p>
                        <p>
                            <span>
                                {userData.followers
                                    ? userData.followers.length
                                    : 0}
                            </span>{" "}
                            {""}
                            {/*on rajoute un s si on a plusieurs followers (supérieur a 1)*/}
                            Abonné
                            {userData.followers && userData.followers.length > 1
                                ? "s"
                                : ""}
                        </p>
                    </div>
                    {/*au click sur la photo de l'user on atterie sur son profil*/}
                    <NavLink exact to="/profil">
                        <div className="user-info">
                            <img src={userData.picture} alt="user-img"></img>
                        </div>
                    </NavLink>
                    {/*le form*/}
                    <div className="post-form">
                        <textarea
                            name="message"
                            id="message"
                            placeholder="Ecrire.."
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        ></textarea>
                        {/* Si message il est sur 'true' on affiche un previex*/}
                        {message || postPicture || video.length > 20 ? (
                            <li className="card-container">
                                <div className="card-left">
                                    <img
                                        src={userData.picture}
                                        alt="user-pic"
                                    ></img>
                                </div>
                                <div className="card-right">
                                    <div className="card-header">
                                        <div className="pseudo">
                                            <h3>{userData.pseudo}</h3>
                                        </div>
                                        {/* nous permet d'afficher la date en temps reel*/}
                                        <span>
                                            {timestampParser(Date.now())}
                                        </span>
                                    </div>
                                    <div className="content">
                                        <p> {message}</p>
                                        <img src={postPicture} alt="" />
                                        {video && (
                                            <iframe
                                                src={video}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={video}
                                            ></iframe>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ) : null}
                        {/*on fait une condition, si on met une photo on ne pourra pas mettre de vidéo et vice versa*/}
                        <div className="footer-form">
                            <div className="icon">
                                {isEmpty(video) && (
                                    <>
                                        <img
                                            src="./img/icons/picture.svg"
                                            alt="img"
                                        />
                                        <input
                                            type="file"
                                            id="file-upload"
                                            name="file"
                                            accept="jpg, jpeg, png"
                                            onChange={(e) => handlePicture(e)}
                                        />
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo("")}>
                                        Supprimer Video
                                    </button>
                                )}
                            </div>
                            {/*message d'erreur */}
                            {/*si il y'a une erreur sur le format/taille */}
                            {!isEmpty(error.format) && <p>{error.format}</p>}
                            {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}

                            <div className="btn-send">
                                {/*cancel post ne s'affichera que si il y'a quelques chose a effacer*/}
                                {message || postPicture || video.length > 20 ? (
                                    <button
                                        className="cancel"
                                        onClick={cancelPost}
                                    >
                                        Annuler le message{" "}
                                    </button>
                                ) : null}
                                <button className="send" onClick={handlePost}>
                                    Envoyer
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;
