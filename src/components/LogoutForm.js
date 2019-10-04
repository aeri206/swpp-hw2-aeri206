import React, { Component } from "react";
import * as actionCreators from "../actions/index";
import { connect } from "react-redux";

class LogoutForm extends Component {
    onClickButton = () => {
        const id = this.props.loginedUser.id;
        this.props.onRemoveLoginUser(id, this.props);
        
    }
    render(){
        return(<button onClick={this.onClickButton}id="logout-button">Logout</button>)
    }
}
const mapStateToProps = state => {
    return {
        loginedUser : state.userData.loginedUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRemoveLoginUser: (id, ownProps) => dispatch(actionCreators.logout(id, ownProps))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutForm);