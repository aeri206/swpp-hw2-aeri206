import React, { Component } from "react";

import { Redirect } from 'react-router-dom';
import * as ActionCreators from "../actions/index";
import { connect } from "react-redux";

class LoginForm extends Component {
  componentDidMount(){
    this.props.onGetAllUser();
  }
  state={
    "email-input": "",
    "pw-input": "",
    logined: false
  }
  handleChange = e => {
    this.setState(
      {[e.target.id] : e.target.value}
    );
  }
  tryLogin = () => {
    if (this.state["email-input"] === "swpp@snu.ac.kr" && this.state["pw-input"] === "iluvswpp"){
      this.props.onSetLoginUser(1);
      this.setState({logined : true});
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
          />
          </form>
          <button id="login-button" onClick={() => this.tryLogin()}>Login</button>
          </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      storedUsers: state.userData.users
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      onGetAllUser: () => dispatch(ActionCreators.getUsers()),
      onSetLoginUser: id => dispatch(ActionCreators.login(id))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);