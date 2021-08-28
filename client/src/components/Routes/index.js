import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";

const index = () => {
    return (
        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/profil" exact component={Profil} />
            <Route path="/trending" exact component={Trending} />
        </Router>
    );
};

export default index;