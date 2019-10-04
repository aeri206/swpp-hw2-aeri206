import React, { Component } from 'react';

import { connect } from "react-redux";
import * as actionCreators from "../actions/index";
import { Redirect } from 'react-router-dom';
import CommentList from "./CommentList";
import LogoutForm from "../components/LogoutForm";

class ArticleDetail extends Component {

    componentDidMount(){
        this.props.onGetArticle(this.props.match.params.id);

    }
    onClickBack = () => {
        this.props.history.push('/articles/');
      }
    onClickDelete = () => {
        this.props.onDeleteArticle(this.props.match.params.id);
        this.props.history.push('/articles/');
        }
    onClickEdit = ar => {
        this.props.history.push('/articles/' + ar.id +'/edit');
    }
    render(){
        if (this.props.loginedUser === null) {return (<Redirect to='/login' />);}
        const ar = this.props.selectedArticle;
        let author = this.props.storedUsers.filter(user => user.id === ar.author_id);
        let name;
        const style = {
            visibility: "hidden"
        };
        if (author.length !== 0) {
            name = author[0].name;
            if (author[0].id === this.props.loginedUser.id) style.visibility = "visible";
        }
        return(
            <div>
                <LogoutForm history={this.props.history}/>
                <h2 id='article-title'>{ar.title}</h2>
                <h3 id='article-author'>{name}</h3>
                <h4 id='article-content'>{ar.content}</h4>
                <div style={style}>
                <button id='delete-article-button' onClick={this.onClickDelete}>Delete Article</button>
                <button id='edit-article-button' onClick={() => this.onClickEdit(ar)}>Edit Article</button>
                </div>
                <button id='back-detail-article-button' onClick={this.onClickBack}>
                    Back to List</button>
                    <CommentList article_id={ar.id}/>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        selectedArticle : state.articleData.selectedArticle,
        storedUsers: state.userData.users,
        loginedUser : state.userData.loginedUser
    }
    }

const mapDispatchToProps = dispatch => {
    return {
        onGetArticle: id =>
            dispatch(actionCreators.getArticleDetail(id)),
        onDeleteArticle: id =>
            dispatch(actionCreators.deleteArticle(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);