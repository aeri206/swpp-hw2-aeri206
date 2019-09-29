import React, { Component } from 'react';

import { connect } from "react-redux";
import * as actionCreators from "../actions/index";

class ArticleDetail extends Component {

    componentDidMount(){
        this.props.onGetArticle(this.props.match.params.id);
    }
    
    render(){
        console.log(this.props);
        return(
            <div></div>
        )
    }

}

const mapStateToProps = state => {
    return {
        selectedArticle : state.articleData.selectedArticle,
        ArticleAuthor : state.articleData.selectedUser
    }
    }

const mapDispatchToProps = dispatch => {
    return {
        onGetArticle: id =>
            dispatch(actionCreators.getArticleDetail(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);