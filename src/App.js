import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import './App.css';

import LoginForm from "./components/LoginForm";

class App extends Component {
  render(){
    return(
      <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/login' exact render={() => <LoginForm title="Login Page" />} />
          <Redirect exact from='/' to='/login' />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;

/* <Route path='/articles' exact component={NewTodo} /> */