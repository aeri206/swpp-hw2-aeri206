import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers,applyMiddleware } from 'redux';
import articleReducers from "./reducers/reducers";
import userReducers from "./reducers/userReducers";
import { Provider } from 'react-redux';
import * as types from "./actions/ActionType"
import thunk from "redux-thunk";

import axios from 'axios';


const logger = store => {
    return next => {
      return action => {
        // console.log('[Middleware] Dispatching', action);
        const result = next(action);
        console.log('[Middleware] Next State', store.getState());
        return result;
      };
    };
  };
  

const rootreducer = combineReducers({
    articleData : articleReducers,
    userData : userReducers
});
const store = createStore(rootreducer,applyMiddleware(logger, thunk));

ReactDOM.render( 
        <Provider store={store}>
            <App />
        </Provider>, 
        document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
