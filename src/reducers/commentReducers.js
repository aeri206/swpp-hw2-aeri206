import * as types from '../actions/ActionType';

const initialState = {
    comments:[]
}

function commentReducers (state = initialState, action){
    switch(action.type){
        case types.GETCOMMENTS:
            return {...state, comments : action.comments};
        default:
            return state;
    }
};

export default commentReducers;