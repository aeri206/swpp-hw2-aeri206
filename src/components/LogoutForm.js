import React, { Component } from "react";
import * as actionCreators from "../actions/index";
import { connect } from "react-redux";

class LogoutForm extends Component {
    onClickButton = id => {
        console.log("hello");
        this.props.onRemoveLoginUser(id);
    }
    render(){
        const user = this.props.loginedUser.id;
        return(<button onClick={() => {this.onClickButton(user)}}id="logout-button">Logout</button>)
    }
}
const mapStateToProps = state => {
    return {
        loginedUser : state.userData.loginedUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRemoveLoginUser: id => dispatch(actionCreators.logout(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutForm);