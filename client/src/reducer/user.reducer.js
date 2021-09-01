import { GET_USER } from "../actions/user.actions.js";

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

        default:
            return state;
    }
}
