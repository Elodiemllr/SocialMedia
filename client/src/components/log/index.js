import React, { useState } from "react";
import SignInForm from "./SignInForm.js";
import SignUpForm from "./SignUpForm.js";
//comp individuel concernant la connexion
const Log = (props) => {
    //1. ce qu'on stock
    //2. la logique
    //3. ce qu'on renvoie en jsx

    //ici c'est mon form d'inscription avec un hook d'état pour savoir sur lequel des deux je me positionne en premier (ici sur l'inscription d'abord).
    // sur true j'ai le modal d'inscription
    //1. ce qu'on stock
    // setquelquehcose nous permet d'éditer la base
    const [signUpModal, setSignUpModal] = useState(props.signUp);
    const [signInModal, setSignInModal] = useState(props.signIn);

    //2. la logique
    // on recupère l'evenement de ce qui a été clické (e) pour l'identifier
    const handleModals = (e) => {
        // si l id de l'event est sur l'id register alors on passe signInModal a false et l'autre a true
        if (e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
            // et ici on fait l'inverse
        } else if (e.target.id === "login") {
            setSignInModal(true);
            setSignUpModal(false);
        }
    };
    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    {/* au click, on lance la fonction handleModals */}
                    {/* Pour la classe, on lui dit que si signUpModal est sur true alors on lui active la class */}
                    <li
                        onClick={handleModals}
                        id="register"
                        className={signUpModal ? "active-btn" : null}
                    >
                        S'inscrire
                    </li>
                    <li
                        onClick={handleModals}
                        id="login"
                        className={signInModal ? "active-btn" : null}
                    >
                        Se connecter
                    </li>
                </ul>
                {/* si signUpModal est sur true alors on affiche le comp signUpForm */}
                {signUpModal && <SignUpForm />}
                {/* si signInModal est sur true alors on affiche le comp signInForm*/}
                {signInModal && <SignInForm />}
            </div>
        </div>
    );
};

export default Log;
