import React, {Component} from 'react';

import {connect} from 'react-redux';
import * as ActionCreators from "../actions/index";
import Comment from "../components/Comment";
import { withRouter } from 'react-router';

class CommentList extends Component {
    state={
        "content":""
    }
    componentDidMount(){
        this.props.onGetAllComments();
    }
    handleChange = e => {
        this.setState(
          {content : e.target.value}
        );
      }
    
    onUpdateComment(id, content){
        const newCM = this.props.storedComments.filter(cm => cm.id === id)[0];
        newCM.content = content;
        this.props.onUpdateComment(newCM);
    }
    onDeleteComment(id){
        this.props.onDeleteComment(id);
    }
    onCreateComment(){
        if(this.state.content === "") return;
        const newComment = {};
        newComment.article_id = this.props.article_id;
        newComment.author_id = this.props.loginedUser.id;
        newComment.content = this.state.content;
        this.props.onCreateComment(newComment);

    }
    render(){
        const ar = this.props.selectedArticle;
        const comments = this.props.storedComments.filter(cm => cm.article_id === ar.id);
        const selected = comments.map(cm => {
            let author = this.props.storedUsers.filter(user => user.id === cm.author_id);
            const editable = (this.props.loginedUser.id === cm.author_id);
            return(
                <Comment
                    key={cm.id}
                    id={cm.id}
                    author={author[0].name}
                    editable={editable}
                    content={cm.content}
                    onUpdate={(id, data) => this.onUpdateComment(id, data)}
                    onDelete={id => this.onDeleteComment(id)}
                />
            )
        });
        return(
        <div className="commentList"> <span className="title"> Comment List </span>
            <div>{selected}</div>
            <input id="new-comment-content-input" onChange={this.handleChange}></input>
            <button id="confirm-create-comment-button" onClick={() => this.onCreateComment()}>Create Comment</button>
        
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        storedComments: state.commentData.comments,
        storedUsers: state.userData.users,
        selectedArticle : state.articleData.selectedArticle,
        loginedUser : state.userData.loginedUser
    }
}

const mapDisPatchToProps = dispatch => {
    return {
        onGetAllComments: () => dispatch(ActionCreators.getComments()),
        onUpdateComment: cm => dispatch(ActionCreators.updateComment(cm)),
        onDeleteComment: id => dispatch(ActionCreators.deleteComment(id)),
        onCreateComment: cm => dispatch(ActionCreators.createComment(cm))
    }
}

export default connect(mapStateToProps, mapDisPatchToProps)(withRouter(CommentList));