import {
    FOLLOW_USER,
    GET_USER,
    UNFOLLOW_USER,
    UPDATE_BIO,
    UPLOAD_PICTURE,
} from "../actions/user.actions.js";

//on va faire evoluer le state au fur et à mesure
const initialState = {};

//Ici on va incrémenter notre initialState avec nos données obtenue dans action.payload
// on le fait pour acceder au nom de l'user sur la navbar
//les données seront du coup accessible de partout grace à redux
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        //dans le cas ou c'est l'action GET_USER alors on retourn les données (action.payload)
        case GET_USER:
            return action.payload;

        case UPLOAD_PICTURE:
            return {
                //pour recuperer les données de notre user
                ...state,
                // pour changer picture
                picture: action.payload,
            };
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload,
            };
        case FOLLOW_USER:
            return {
                ...state,
                //on rajoute le followers squivis
                following: [action.payload.idToFollow, ...state.following],
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                //on retire le followers plus suivis
                following: state.following.filter(
                    (id) => id !== action.payload.idToUnfollow
                ),
            };

        default:
            return state;
    }
}
