import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as ActionCreators from "../actions/index";
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import Article from "../components/Article";
import LogoutForm from "../components/LogoutForm";
import "./ArticleList.css";
class ArticleList extends Component {
    componentDidMount() {
        this.props.onGetAllArticles();
      }
      clickArticleHandler = (ar) => {
        this.props.history.push('/articles/' + ar.id);
      }
      onClickCreate = () => {
        this.props.history.push('/articles/create');
      }
    render(){
      if (this.props.loginedUser === null) return (<Redirect to='/login' />);
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
    <div className="articleList">
      <div className='userInfo'>
      Logined as 
      <span className="author">&nbsp;{this.props.loginedUser.name}&nbsp;</span>
      ( <span className="account">&nbsp;{this.props.loginedUser.email}&nbsp;</span>)
      <LogoutForm history={this.props.history}/>
    </div>
    <div className='title'>
    <span> {this.props.title} </span>
    <button id="create-article-button" onClick={this.onClickCreate}>Create Article</button>
    </div>
    <div className="articleInfo">{articles}</div>
    
  </div>);
        
    }
}

const mapStateToProps = state => {
    return {
      storedArticles : state.articleData.articles,
      storedUsers: state.userData.users,
      loginedUser : state.userData.loginedUser
    };
  }

const mapDispatchToProps = dispatch => {
    return {
      onGetAllArticles: () => dispatch(ActionCreators.getArticles())
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ArticleList));