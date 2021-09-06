import React from "react";
import { NavLink } from "react-router-dom";

const LeftNavBar = () => {
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    {/*activeClassName permettra que lorsque on est sur le lien , la class se met automatiquement  */}
                    <NavLink to="/" exact activeClassName="active-left-nav">
                        <img src="./img/icons/home.svg" alt="home" />
                    </NavLink>
                    <br />
                    <NavLink
                        to="/trending"
                        exact
                        activeClassName="active-left-nav"
                    >
                        <img src="./img/icons/rocket.svg" alt="rocket" />
                    </NavLink>
                    <NavLink
                        to="/profil"
                        exact
                        activeClassName="active-left-nav"
                    >
                        <img src="./img/icons/user.svg" alt="profil" />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default LeftNavBar;
