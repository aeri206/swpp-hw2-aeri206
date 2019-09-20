import React, { Component } from "react";

import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
  state={
    "email-input": "",
    "password-input": "",
    logined: false
  }
  handleChange = e => {
    console.log(this.state);
    this.setState(
      {[e.target.id] : e.target.value}
    );
  }
  tryLogin = () => {
    if (this.state["email-input"] === "swpp@snu.ac.kr" && this.state["password-input"] === "iluvswpp"){
      this.setState({loginSucceed : true});
    }
    else alert ("Email or password is wrong");
  }
  render(){
    let redirect = null;
    if (this.state.logined) {
      redirect = <Redirect to='/articles' />
    }
    return(
      <div>
        {redirect}
        <form><input
          id="email-input"
          placeholder="email"
          onChange={this.handleChange}
          
          />
          <input
          id="pw-input"
          placeholder="password"
          onChange={this.handleChange}
          // value={this.state.phone}
          />
          </form>
          <button id="login-button" onClick={() => this.tryLogin()}>Login</button>
          </div>
      );
    }
  }
  
  export default LoginForm;