import React from 'react';


const Article = props => {
    return(
        <div className="Article">
            <div> id : {props.id} </div> 
            <div> author : {props.author}</div>
        <button onClick={props.clickDetail}>{props.title}</button>
        <div>{props.content}</div>
    </div>
        );

}

export default Article;