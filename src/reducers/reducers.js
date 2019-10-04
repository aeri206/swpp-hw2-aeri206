import * as types from '../actions/ActionType';

const initialState = {
    articles:[],
    selectedArticle: []
};


function articleReducers (state = initialState, action){
    switch(action.type){
        case types.GETARTICLE:
            return {...state, articles: action.articles}
        case types.GETARTICLEDETAIL:
            return {...state, selectedArticle: action.target }
        default:
            return state;
    }
};

export default articleReducers;
