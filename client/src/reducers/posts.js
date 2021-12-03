//a reducer is a function that accepts state and action. based on the action type, do some logic, return action or state.
import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH} from "../constants/actionTypes";
 export default (state = [], action) => {
     
    switch(action.type) {
        case FETCH_ALL:
            return { 
                ...state, 
                posts: action.payload.data, 
                currentPage: action.payload.currentPage, 
                numberOfPages: action.payload.numberOfPages
            }; 
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts:  action.payload
                };
        case CREATE:
            return [...state, action.payload]; //spread post data and add a new post.
        case UPDATE:
        case LIKE:
            //Map returns an array. We check if the post id is equal to the payload id. If it is, we return the payload, else return the post as it is. 
            //Action.payload == newlyupdated post.
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            //Filter out the post that is deleted.
            return state.filter((post) => post._id !== action.payload);
        default:
            return state;

    }
}