import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers,applyMiddleware } from 'redux';
import articleReducers from "./reducers/reducers";
import userReducers from "./reducers/userReducers";
import commentReducers from "./reducers/commentReducers";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";



const rootreducer = combineReducers({
    articleData : articleReducers,
    userData : userReducers,
    commentData : commentReducers
});
const store = createStore(rootreducer,applyMiddleware(thunk));

ReactDOM.render( 
        <Provider store={store}>
            <App />
        </Provider>, 
        document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
