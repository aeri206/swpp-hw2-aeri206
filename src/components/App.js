import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import './App.css';

import LoginForm from "./LoginForm";
import ArticleList from "../containers/ArticleList";
import ArticleDetail from "../containers/ArticleDetail";
import ArticleWrite from "../containers/ArticleWrite";

// import * as types from "../actions/ActionType";

class App extends Component {

    render() {  
        return (
            <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/login' exact component={LoginForm} />
          <Redirect exact from='/' to='/login' />
          <Route path="/articles/create" exact render={()=><ArticleWrite mode="create"/>}/>
          <Route path="/articles" exact render={() =><ArticleList title="ArticleList!" /> } />
          <Route path='/articles/:id' exact component={ArticleDetail} />
          <Route path="/articles/:id/edit" exact render={()=><ArticleWrite mode="edit"/>}/>
          <Route render={() => <h1>Not Founddd</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
        );
    }
}

export default App;