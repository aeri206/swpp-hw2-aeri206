import * as types from "./ActionType";
import axios from "axios";



export const getArticles_ = articles => {
    return { type: types.GETARTICLE, articles:articles };
  };
  export const createComment = cm => {
    return dispatch => {
      return axios.post('/api/comments', cm)
        .then(() => {
          dispatch(getComments());
        })
    }
  }
export const createArticle = (ar, ownProps) => {
  return dispatch => {
    return axios.post('/api/articles', ar)
      .then(res => {
        ownProps.history.push('/articles/' + res.data.id);
        dispatch(getArticles());
      });

  }
}

export const updateComment = (comment) => {
  return dispatch => {
    return axios.put(`/api/comments/${comment.id}`, comment)
      .then(() => {
        dispatch(getComments());
      })

  }
}
export const updateArticle = (ar, ownProps) => {
  return dispatch => {
    return axios.put(`/api/articles/${ar.id}`, ar)
      .then(() => {
        ownProps.history.goBack();
      });
  }
}

export const getArticles = () => {
  return dispatch => {
    return axios.get('/api/articles')
      .then(res => dispatch(getArticles_(res.data)));
  };
};

export const getComments_ = comments => {
  return {type : types.GETCOMMENTS, comments : comments}
}

export const getComments = () => {
  return dispatch => {
    return axios.get('/api/comments')
      .then(res => dispatch(getComments_(res.data)));
  }
}

export const deleteArticle = id => {
  return dispatch => {
    return axios.delete(`/api/articles/${id}`);
  }
};
export const deleteComment = id => {
  return dispatch => {
    return axios.delete(`/api/comments/${id}`)
      .then(() => {dispatch(getComments());
      })
  }
}

export const logout_ = id => {
  return {type: types.LOGOUT, id}
}

export const logout = (id, ownProps) => {
  return dispatch => {
    return axios.get(`/api/user/${id}`)
      .then(res => {
        const newUser = {...res.data, logged_in : false};
        axios.put(`/api/user/${id}`, newUser).then(() => {
          dispatch(logout_(id))
          ownProps.history.push('/login')
        }
          )
      })
  }
}

export const login_ = id => {
  return {type: types.LOGIN, id};
}

export const alreadyLogined = id => {
  return dispatch => {
  dispatch({type: types.ALREADYLOGIN, id});
  }
}

export const login = (id, ownProps) => {
  return dispatch => {
    dispatch(login_(id));
    return axios.get(`/api/user/${id}`)
      .then(res => {
        const newUser = {...res.data, logged_in : true};
        axios.put(`/api/user/${id}`,newUser)
          .then(
            ownProps.history.push('/articles/'))
      })
  }
}

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

