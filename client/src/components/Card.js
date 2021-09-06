import React, { useState } from "react";

//comp individuel pour un post (mit dans le thread)

//on se recupère les données dans "posts"
const Card = ({ post }) => {
    //tant qu'on a pas la data de notre card, on met un "loading"
    const [isLoading, setIsLoading] = useState(true);

    return (
        <li className="card-container" key={post._id}>
            {/*si "isLoading" est sur true, alors on met la classe fas fa-spinner */}
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                //sinon on met ça
                <h2> ttest</h2>
            )}
        </li>
    );
};

export default Card;
