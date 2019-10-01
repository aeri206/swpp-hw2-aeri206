import * as types from '../actions/ActionType';


const initialState = {
    users: null,
    loginedUser : null
};


function userReducers (state = initialState, action){
    switch(action.type){
        case types.GETUSER:
            return {...state, users: action.users}
        case types.LOGIN:
            const logined = state.users.filter(user => user.id === action.id)[0];
            const loginedUser = {...logined, logged_in : true};
            return {...state, loginedUser : loginedUser }
        case types.LOGOUT:
            return {...state, loginedUser : null}
        default:
            return state;
    }
};

export default userReducers;
