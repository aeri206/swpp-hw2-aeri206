import thunk from "redux-thunk";
import { createStore, combineReducers,applyMiddleware } from 'redux';
import * as actionTypes from "../actions/ActionType";


const getMockArticleReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch(action.type) {
            default:
                break;
        }
        return state;
    }
);

const getMockUserReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch(action.type) {
            default:
                break;
        }
        return state;
    }
);

const getMockCommentReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch(action.type) {
            default:
                break;
        }
        return state;
    }
);

export const getMockStore = initial => {
    
    const mockUserReducer = getMockUserReducer(initial.userData);
    const mockCommentReducer = getMockCommentReducer(initial.commentData);
    const mockArticleReducer = getMockArticleReducer(initial.articleData);
    const rootReducer = combineReducers({
        articleData : mockArticleReducer,
        userData : mockUserReducer,
        commentData : mockCommentReducer
    });
    const mockStore = createStore(rootReducer,applyMiddleware(thunk));
    return mockStore;
}
