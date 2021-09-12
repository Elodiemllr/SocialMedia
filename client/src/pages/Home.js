import React, { useContext } from "react";
import { UidContext } from "../components/AppContext.js";
import LeftNavBar from "../components/LetNavBar.js";
import Log from "../components/log";
import NewPostForm from "../components/Post/NewPostForm.js";
import FriendsHint from "../components/profil/FriendsHint.js";
import Thread from "../components/Thread.js";
import Trends from "../components/Trends.js";
//ici je renvoie tout ce qu'il concerne l'accueil alors que dans components je fais des comp individuel

const Home = () => {
    //on verifie si notre user est connecté
    const uid = useContext(UidContext);
    return (
        <div className="home ">
            {/* on importe notre leftBar */}
            <LeftNavBar />
            <div className="main">
                {/*l'affichage change en fonction de si l'user est connecté ou pas */}
                <div className="home-header">
                    {/*si on a uid, que notre user est présent alors on affiche le formaulaire pour poster sinon on affiche pour se loguer*/}

                    {uid ? (
                        <NewPostForm />
                    ) : (
                        <Log signin={true} signup={false} />
                    )}
                </div>
                <Thread />
            </div>
            <div className="right-side">
                <div className="right-side-container">
                    <div className="wrapper">
                        <Trends></Trends>
                        {uid && FriendsHint}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
