import React, { Component } from "react";

import { Redirect } from 'react-router-dom';
import * as ActionCreators from "../actions/index";
import { connect } from "react-redux";

import './LoginForm.css';

class LoginForm extends Component {
  componentDidMount(){
    this.props.onGetAllUser();
  }
  state={
    "email-input": "",
    "pw-input": ""
  }
  handleChange = e => {
    this.setState(
      {[e.target.id] : e.target.value}
    );
  }
  tryLogin = () => {
    if (this.state["email-input"] === "swpp@snu.ac.kr" && this.state["pw-input"] === "iluvswpp"){
      this.props.onSetLoginUser(1, this.props);
    }
    else alert ("Email or password is wrong");
  }
  render(){
    if (this.props.storedUsers !== null) {
      const loginedUser = this.props.storedUsers.filter(user => user.logged_in);
      if(loginedUser.length === 1){
        const {id} = loginedUser[0];
        this.props.onUpdateLoginUser(id);
        return (<Redirect to='/articles' />)
      }
    }
    return(
      <React.Fragment>
        <div className="LoginForm">
        <input
          id="email-input"
          placeholder="email"
          onChange={this.handleChange}
          />
          
          <input
          id="pw-input"
          placeholder="password"
          onChange={this.handleChange}
          />
          
          <button id="login-button" onClick={this.tryLogin}>Login</button>
          </div>
          </React.Fragment>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      storedUsers: state.userData.users,
      loginedUser : state.userData.loginedUser
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      onGetAllUser: () => dispatch(ActionCreators.getUsers()),
      onSetLoginUser: (id, ownProps) => dispatch(ActionCreators.login(id, ownProps)),
      onUpdateLoginUser : (id) => dispatch(ActionCreators.alreadyLogined(id))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);