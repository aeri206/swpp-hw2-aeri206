import React, { Component } from 'react';
// import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { connect } from 'react-redux';
import * as ActionCreators from "../actions/index";
import { withRouter } from 'react-router';

import Article from "../components/Article";

class ArticleList extends Component {
    componentDidMount() {
        this.props.onGetAllArticles();
      }
      clickArticleHandler = (ar) => {
        this.props.history.push('/articles/' + ar.id);
      }
    render(){
      const articles = this.props.storedArticles.map(ar => {
        let author = this.props.storedUsers.filter(user => user.id === ar.author_id);
        return (
          <Article
            id={ar.id}
            key={ar.id}
            title={ar.title}
            author={author[0].name}
            content={ar.content}
            clickDetail={()=>this.clickArticleHandler(ar)}
          />
        );
      });
    return (
    <div className="ArticleList">
    <div className='title'>
      {this.props.title}
    </div>
    {articles}
    
  </div>);
        
    }
}

// <NavLink to='/new-todo' exact>New Todo</NavLink>
const mapStateToProps = state => {
    return {
      storedArticles : state.articleData.articles,
      storedUsers: state.userData.users
    };
  }

const mapDispatchToProps = dispatch => {
    return {
      onGetAllArticles: () => dispatch(ActionCreators.getArticles())
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ArticleList));