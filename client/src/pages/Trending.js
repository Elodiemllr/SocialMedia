import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import LeftNavBar from "../components/LetNavBar.js";
import Card from "../components/Post/Card";
import FriendsHint from "../components/profil/FriendsHint.js";
import Trends from "../components/Trends.js";
import { isEmpty } from "../Utils.js";

const Trending = () => {
    const uid = useContext(UidContext);
    const trendList = useSelector((state) => state.trendingReducer);
    return (
        <div className="trending-page">
            <LeftNavBar />
            <div className="main">
                <ul>
                    {!isEmpty(trendList[0]) &&
                        trendList.map((post) => (
                            <Card post={post} key={post._id} />
                        ))}
                </ul>
            </div>
            {/*sur la droite on affiche les tendance et des propositions d'amis*/}

            <div className="right-side">
                <div className="right-side-container">
                    <Trends />
                    {uid && <FriendsHint />}
                </div>
            </div>
        </div>
    );
};

export default Trending;
