import React from 'react';
import './Article.css'

const Article = props => {
    return(
        <div className="Article">
            <div className="info"> <span className="id"> {props.id} </span>
        <button onClick={props.clickDetail}>{props.title}</button>
        <span className="account">  {props.author} </span>
        </div>
        <div className="content">{props.content}</div>
    </div>
        );

}

export default Article;