import React, { Component } from 'react';
// import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import axios from 'axios';

class ArticleList extends Component {
    
    render(){
        let articles = null;
        axios.get("http://localhost:8000/articles")
        .then(res => {
           articles = res.data;
        });
        return (
            <div>articles</div>
        ) 
        
    }
}

export default ArticleList;