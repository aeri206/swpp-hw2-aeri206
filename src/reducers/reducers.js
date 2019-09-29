import * as types from '../actions/ActionType';

const initialState = {
    articles:[],
    selectedArticle: null,
    selectedUser: null
};


function articleReducers (state = initialState, action){
    switch(action.type){
        case types.GETARTICLE:
            return {...state, articles: action.articles}
        case types.INIT:
            return action.state;
        case types.LOGIN:
            return state;
        case types.GETARTICLEDETAIL:
            return {...state, selectedArticle: action.target }
        default:
            return state;
    }
};

export default articleReducers;
