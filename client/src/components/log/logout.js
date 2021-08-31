import axios from "axios";
import cookieParser from "cookie-parser";
import React from "react";

const Logout = () => {
    //on passe la clef du cookie en params
    const removeCookie = (key) => {
        //petite sécu toujours à mettre
        if (window !== "undefined") {
            cookieParser.remove(key, { expires: 1 });
        }
    };
    const logout = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true,
        })
            .then(() => removeCookie("jwt"))
            .catch((err) => console.log(err));
        //pour ramener a slash et voir si le cookie est present
        window.location = "/";
    };

    return (
        <li onClick={logout}>
            <img src="./img/icons/logout.svg" alt="logout" />
        </li>
    );
};

export default Logout;
