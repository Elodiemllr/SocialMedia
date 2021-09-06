import React from "react";
import LeftNavBar from "../components/LetNavBar.js";
import Thread from "../components/Thread.js";
//ici je renvoie tout ce qu'il concerne l'accueil alors que dans components je fais des comp individuel

const Home = () => {
    return (
        <div className="home">
            {/* on importe notre leftBar */}
            <LeftNavBar />
            <div className="main">
                <Thread />
            </div>
        </div>
    );
};

export default Home;
