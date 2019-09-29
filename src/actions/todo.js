import * as types from "./ActionType";
import axios from "axios";


export const getArticles_ = articles => {
    return { type: types.GETARTICLE, articles:articles };
  };
  
  export const getArticles = () => {
    return dispatch => {
      return axios.get('/api/articles')
        .then(res => dispatch(getArticles_(res.data)));
    };
  };

  export const getUsers_ = users => {
    return { type: types.GETUSER, users: users};
  }
  export const getUsers = () => {
    return dispatch => {
      return axios.get('/api/user')
        .then(res => dispatch(getUsers_(res.data)));
    }
  }

export const getArticleDetail_ = detail => {
  return { type: types.GETARTICLEDETAIL, target : detail };
}


export const getArticleDetail = id => {
  return dispatch => {
    return axios.get(`/api/articles/${id}`)
      .then(res => dispatch(getArticleDetail_(res.data)))
  }
};

