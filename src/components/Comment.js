import React, { Component } from 'react';
import "./Comment.css";


class Comment extends Component {
    onClickEdit = () => {
    let edit_data = prompt( '', this.props.content );
    
    if (edit_data!==null && edit_data.length > 0){
        this.props.onUpdate(this.props.id, edit_data);
    }
}
    onClickDelete = () => {
        this.props.onDelete(this.props.id);
    }
    render(){
        const btn = this.props.editable? <div><button id="edit-comment-button" onClick={() => {this.onClickEdit()}}>Edit</button>
        <button id="delete-comment-button" onClick={() => this.onClickDelete()}>Delete</button></div> : <div></div>
        return(
        <div  className="Comment">
                <div> <span className="author">{this.props.author} </span><span className="commentcontent">{this.props.content}</span>{btn}</div>
            
        </div>
    
        );

    }

}

export default Comment;