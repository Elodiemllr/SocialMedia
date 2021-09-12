import React from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import Navbar from "../Navbar.js";

// ici je r'envoie mes routes suivant le chemin choisit
const Index = () => {
    {
        /* const [isActive, setIsActive] = useState("false");

    const ToggleClass = () => {
        setIsActive(!isActive);
    };*/
    }
    return (
        <Router>
            {/*  <div className={isActive ? "white" : "dark "}> */}
            {/*  <button onClick={ToggleClass}>WOP </button>*/}
            <Navbar />

            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/profil" exact component={Profil} />
                <Route path="/trending" exact component={Trending} />
                <Redirect to="/" />
            </Switch>
            {/*   </div> */}
        </Router>
    );
};

export default Index;
