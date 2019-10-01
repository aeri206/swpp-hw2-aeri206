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
            let loginedUser = {};
            const loginUpdated = state.users.map(user => {
                if (user.id !== action.id) return {...user};
                else {
                    loginedUser = {...user};
                    loginedUser.logged_in = true;
                    return loginedUser;
                }
            });
            return { users: loginUpdated, loginedUser : loginedUser}
        case types.ALREADYLOGIN:
            const logined = state.users.filter(user => user.logged_in);
            return {...state, loginedUser : logined[0] }
        case types.LOGOUT:
                const logoutUpdated = state.users.map(user => {
                    if (user.id !== action.id) return {...user};
                    else {
                        const tmpUser = {...user};
                        tmpUser.logged_in = false;
                        return tmpUser;
                    }
                });
            return {users: logoutUpdated, loginedUser : null}
        default:
            return state;
    }
};

export default userReducers;
