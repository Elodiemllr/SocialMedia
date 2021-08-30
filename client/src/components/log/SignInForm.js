import axios from "axios";
import React, { useState } from "react";

//comp individuel concernant la connexion
const SignInForm = () => {
    //ici ce qu'on stock / les donénes qu'on doit transiter
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //ici la logique
    const handleLogin = (e) => {
        // on évite que la passe se recharge lors de l'envoie
        e.preventDefault();
        // si on tombe sur 'emailErrors' alors on selectionne les class email error et plus bas on lui injectera le message d'erreur
        const emailErrors = document.querySelector(".email.error");
        const passErrors = document.querySelector(".password.error");

        axios({
            //On utilise la méthode "post" de axios pour aller piocher dans notre base de donner.
            //on précise qu'elle route (ici api/user/login)
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            //On envoie à notre base de données ce qu'il attends Soit 'email et le password recuperé
            data: {
                email,
                password,
            },
        })
            //ensuite si la réponse envoie une errors
            .then((res) => {
                console.log(res);
                if (res.data.errors) {
                    emailErrors.innerHTML = res.data.errors.email;
                    passErrors.innerHTML = res.data.errors.password;
                } else {
                    //sinon alors on est consideré comme connecté et on r'envoie l'utilisateur à l'accueil
                    window.location = "/";
                }
            })
            //si notre requete axios ne marche pas alors on envoie l'erreur
            .catch((err) => {
                console.log(err);
            });
    };

    // lors de l'envoie de mon formulaire  (au click sur submit) on execute handlelogin
    return (
        <form action="" onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor="email"> Email </label>
            <br />
            {/* si l'input change alors on récupère le changement (l'evenement) et on le stock  dans notre set */}
            <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <div className="email error"></div>
            <br />
            <label htmlFor="password"> Mot de passe </label>
            <br />
            {/*le type "password" nous permet de cacher le mot de passe */}
            <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <div className="password error"></div>
            <br />
            {/* ici se trouve notre bouton "submit" qui va nous permettre de declencher lros de l'envoie notre handleLogin avec notre event à l'interieur */}
            <input type="submit" value="Se connecter" />
        </form>
    );
};

export default SignInForm;
