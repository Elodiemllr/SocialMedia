import React, { useState } from "react";
//import axios from "axios";
//import SignInForm from "./SignInForm";

//comp individuel concernant la connexion
const SignUpForm = () => {
    //Use State permet d'avoir un etat dans notre function components
    // la première variable sera notre nouvelle variable de state créer et mis à jour
    // la deuxième sera la fonction a utiliser pour mettre a jour la premiere
    //ici on les initialise a vide au début

    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // POUR VERIFIER SI LES MDP CORRESPONDENT
    const [controlPassword, setControlPassword] = useState("");

    //partie logique pour prendre en compte l'enregistrement de notre user
    const handleRegister = async (e) => {
        //on ne recharge pas la page
        e.preventDefault();
        //on config les erreurs avec les classes
        const terms = document.getElementById("terms");
        const pseudoError = document.querySelector(".pseudo.error");
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const passwordConfirmError = document.querySelector(
            ".password-confirm.error"
        );
        const termsError = document.querySelector(".terms.error");

        passwordConfirmError.innerHTML = "";
        termsError.innerHTML = "";

        //si password n'est pas identique au controlPassword ou que terms n'est pas check
        if (password !== controlPassword || !terms.checked) {
            if (password !== controlPassword)
                passwordConfirmError.innerHTML =
                    "Les mots de passe ne correspondent pas";
            if (!terms.checked)
                termsError.innerHTML =
                    "Veuillez valider les conditions générales";
        }
    };

    //a l'envoie on fait appelle à la fonction handleRegister
    return (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            {/*Au changement on recupère ce qu'il y'a dans l'evenement pour on l'envoie dans set Pseudo */}
            <input
                type="text"
                name="pseudo"
                id="pseudo"
                onChange={(e) => setPseudo(e.target.value)}
                value={pseudo}
            />
            <div className="pseudo error"></div>
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <div className="password error"></div>
            <br />
            <label htmlFor="password-conf">Confirmer mot de passe</label>
            <br />
            <input
                type="password"
                name="password"
                id="password-conf"
                onChange={(e) => setControlPassword(e.target.value)}
                value={controlPassword}
            />
            <div className="password-confirm error"></div>
            <br />
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
                J'accepte les{" "}
                <a href="/" target="_blank" rel="noopener noreferrer">
                    conditions générales
                </a>
            </label>
            <div className="terms error"></div>
            <br />
            <input type="submit" value="Valider inscription" />
        </form>
    );
};

export default SignUpForm;
