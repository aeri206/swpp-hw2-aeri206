import * as types from '../actions/ActionType';


const initialState = {
    users: null
};


function userReducers (state = initialState, action){
    switch(action.type){
        case types.GETUSER:
            return {...state, users: action.users}
        default:
            return state;
    }
};

export default userReducers;
