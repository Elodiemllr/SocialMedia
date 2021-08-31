import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./log/logout.js";

const Navbar = () => {
    //on se recup le uid pour voir si l'user a ses données*
    //on se récupère ce qu'il y'a au plus haut de notre application
    // pour que si il existe on aura un affichage et si non un autre
    const uid = useContext(UidContext);

    //on utilise Redux pourlaisser le nom de notre user dans la barre de nav
    //redux a trois element fondamentaux. ça permet que tout les élements interagissent entre eux (comme voir aparraitre un like)
    //action (notre action), reducer (prends donner et les passe ou les retire du store) et store (fournit les données de la page à l'ecran, contiejt notre state global)
    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/">
                        <div className="logo">
                            <img src="./img/icon.png" alt="icon" />
                            <h3> Instravel</h3>
                        </div>
                    </NavLink>
                </div>
                {/*Si on a notre uid on r'envoie vers profil et on met une certaines classavec le logo pour se deconnecter */}
                {uid ? (
                    <ul>
                        <div>
                            <li className="welcome">
                                <NavLink exact to="/profil">
                                    <h5> Bienvenue </h5>
                                </NavLink>
                            </li>
                            <Logout />
                        </div>
                    </ul>
                ) : (
                    //Si on a pas notre uid alors on r'envoie vers le profil mais avec l'inscription avec le logo pour entrer
                    <ul>
                        <li>
                            <div>
                                <NavLink exact to="/profil">
                                    <img
                                        src="./img/icons/login.svg"
                                        alt="login"
                                    />
                                </NavLink>
                            </div>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
