import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import WriteForm from "../components/WriteForm";
import { Redirect } from 'react-router-dom';
import * as actionCreators from "../actions/index";
import LogoutForm from "../components/LogoutForm";


class ArticleWrite extends Component {
    onClickBack = () => {
        this.props.history.goBack();
    }
    onClickConfirm = newAr => {
        newAr.author_id = this.props.loginedUser.id;
        if (this.props.mode === "edit") {
            newAr.id = this.props.match.params.id;
            this.props.onUpdateArticle(newAr, this.props);
        } else {
            this.props.onCreateArticle(newAr, this.props);
        }
    }
    
    render(){
        if (this.props.loginedUser === null) return (<Redirect to='/login' />);
        const mode = this.props.mode=== "edit" ? {
            title:this.props.selectedArticle.title,
            content:this.props.selectedArticle.content
        } : {};
        
        return(
            <div>
                <LogoutForm/>
        <WriteForm
            oldState={mode}
            edit={this.props.mode==="edit" ? true : false}
            author={this.props.loginedUser.name}
            onClickBack={() => {this.onClickBack()}}
            onClickConfirm={this.onClickConfirm}
             />
        </div>
        
        )
    }

}

const mapStateToProps = state => {
    return {
        selectedArticle : state.articleData.selectedArticle,
        storedArticles : state.articleData.articles,
        loginedUser : state.userData.loginedUser
    };
  }

  const mapDispatchToProps = dispatch => {
    return {
      onUpdateArticle: (ar, ownProps) => dispatch(actionCreators.updateArticle(ar, ownProps)),
      onCreateArticle: (ar, ownProps) => dispatch(actionCreators.createArticle(ar, ownProps))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ArticleWrite));