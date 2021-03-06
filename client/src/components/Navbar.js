import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./log/logout.js";

const Navbar = () => {
    //on se recup le uid pour voir si l'user a ses données*
    //on se récupère ce qu'il y'a au plus haut de notre application
    // pour que si il existe on aura un affichage et si non un autre

    const uid = useContext(UidContext);
    //useSelector = selectionner data de l'utilisateur
    const userData = useSelector((state) => state.userReducer);

    //on utilise Redux pourlaisser le nom de notre user dans la barre de nav
    //redux a trois element fondamentaux. ça permet que tout les élements interagissent entre eux (comme voir aparraitre un like)
    //action (notre action), reducer (prends donner et les passe ou les retire du store) et store (fournit les données de la page à l'ecran, contiejt notre state global)
    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/">
                        <div className="logo">
                            <img src="./img/icon.svg" alt="icon" />
                            <h3> SpaceShare</h3>
                        </div>
                    </NavLink>
                </div>
                <br />

                {/*Si on a notre uid on r'envoie vers profil et on met une certaines classavec le logo pour se deconnecter */}
                {uid ? (
                    <ul>
                        <li className="welcome">
                            <NavLink exact to="/profil">
                                <h5> Bienvenue {userData.pseudo}</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    //Si on a pas notre uid alors on r'envoie vers le profil mais avec l'inscription avec le logo pour entrer
                    <ul>
                        <li>
                            <NavLink exact to="/profil">
                                <img src="./img/icons/login.svg" alt="login" />
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
