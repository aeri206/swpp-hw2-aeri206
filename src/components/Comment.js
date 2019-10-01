import React, { Component } from 'react';



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
        const style = {border: "1px solid gold"};
        return(
        <div  className="Comment" style={style}>
                <div> author : {this.props.author} content : {this.props.content}</div>
            {btn}
        </div>
    
        );

    }

}

export default Comment;