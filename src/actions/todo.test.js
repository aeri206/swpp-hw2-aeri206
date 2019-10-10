import axios from 'axios';
import * as actionCreators from './todo';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from "./ActionType";
import { createBrowserHistory } from 'history';

const stubUser = {
  "id": 1,
  "email": "DISPATCH_TEST_EMAIL",
  "password": "DISPATCH_TEST_PW",
  "name": "DISPATCH_TEST_NAME",
  "logged_in": false
};
const stubArticle = 
  {
    "id": 0,
    "author_id": 1,
    "title": "DISPATCH_TEST_TITLE",
    "content": "DISPTACH_TEST_CONTENT"
}
const stubComment = {
  "id": 1,
  "article_id": 0,
  "author_id": 1,
  "content": "DISPATCH_TEST_CONTENT"
}
const stubState = {
  articleData:{
      articles:[
        {
          "id": 0,
          "author_id": 1,
          "title": "TEST_TITLE",
          "content": "TEST_CONTENT"
      }
      ],
      selectedArticle:{
        "id": 0,
        "author_id": 1,
        "title": "TEST_TITLE",
        "content": "TEST_CONTENT"
    }
  },
  userData:{
      users:[
        {
          "id": 1,
          "email": "TEST_EMAIL",
          "password": "TEST_PW",
          "name": "TEST_NAME",
          "logged_in": false
      }
      ],
      loginedUser:null
  },
  commentData:{
      comments:[
        {
          "id": 1,
          "article_id": 0,
          "author_id": 1,
          "content": "TEST_CONTENT"
        }
      ]
  }
}


describe('ActionCreators', () => {
    const mockStore = configureMockStore([thunk]);
    let store;

    beforeEach(() => {
      store = mockStore(stubState);
    })
    afterEach(() => { jest.clearAllMocks();});

    it(`'getUsers' should fetch users correctly`, async () => {
        const spy = jest.spyOn(axios, 'get')
          .mockImplementation(url => {
            return new Promise((resolve, reject) => {
              const result = {
                status: 200,
                data: [stubUser]
              };
              resolve(result);
            });
          })
          
          await store.dispatch(actionCreators.getUsers());
            expect(spy).toHaveBeenCalledTimes(1);
            const action = store.getActions();
            expect(action[0].type).toBe(types.GETUSER);
            expect(action[0].users).toEqual([stubUser]);
         
      });

    it(`'getArticles' should fetch articles correctly`, (done) => {
      const spy = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
          return new Promise((resolve, reject) => {
            const result = {
              status: 200,
              data: [stubArticle]
            };
            resolve(result);
            reject();
          });
        })

        store.dispatch(actionCreators.getArticles()).then(() => {
          expect(spy).toHaveBeenCalledTimes(1);
          const action = store.getActions();
          expect(action[0].type).toBe(types.GETARTICLE);
          expect(action[0].articles).toEqual([stubArticle]);
          done();
        });
    });

    it(`'getComments' should fetch comments correctly`, (done) => {
      const spy = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
          return new Promise((resolve, reject) => {
            const result = {
              status: 200,
              data: [stubComment]
            };
            resolve(result);
            reject();
          });
        })

        store.dispatch(actionCreators.getComments()).then(() => {
          expect(spy).toHaveBeenCalledTimes(1);
          const action = store.getActions();
          expect(action[0].type).toBe(types.GETCOMMENTS);
          expect(action[0].comments).toEqual([stubComment]);
          done();
        });
    });

    it(`'getArticleDetail' should fetch article detail correctly`, (done) => {
      const spy = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
          return new Promise((resolve, reject) => {
            const result = {
              status: 200,
              data: stubArticle
            };
            resolve(result);
            reject();
          });
        })

        store.dispatch(actionCreators.getArticleDetail(stubArticle.id)).then(() => {
          expect(spy).toHaveBeenCalledTimes(1);
          const action = store.getActions();
          expect(action[0].type).toBe(types.GETARTICLEDETAIL);
          expect(action[0].target).toEqual(stubArticle);
          done();
        });
    });

    it(`'createArticle' should post article correctly`, (done) => {
      const spy = jest.spyOn(axios, 'post')
        .mockImplementation((url, article) => {
          return new Promise((resolve, reject) => {
            const result = {
              status: 200,
              data: stubArticle
            };
            resolve(result);
          });
        })
        const history = createBrowserHistory();
        const mockProps = {history};
        
      store.dispatch(actionCreators.createArticle(stubArticle, mockProps)).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        const action = store.getActions();
        expect(action[0].type).toBe(types.GETARTICLE);
        expect(action[0].articles).toEqual(stubArticle);
        done();
      });
    });

    it(`'createComment' should post comment correctly`, (done) => {
      const spy = jest.spyOn(axios, 'post')
        .mockImplementation((url, comment) => {
          return new Promise((resolve, reject) => {
            resolve({});
          });
        })

        const spyGet = jest.spyOn(axios, 'get')
         .mockImplementation((url) => {
           return new Promise((resolve, reject) => {
             const result = {
               status: 200, 
               data: [stubComment]
             };
             resolve(result);
             reject();
           })

         })
        
      store.dispatch(actionCreators.createComment(stubComment)).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spyGet).toHaveBeenCalledTimes(1);
        const action = store.getActions();
        expect(action[0].type).toBe(types.GETCOMMENTS);
        expect(action[0].comments).toEqual([stubComment]);
        done();
      });
    });

    it(`'deleteArticle' should delete article correctly`, (done) => {
      const spy = jest.spyOn(axios, 'delete')
        .mockImplementation(url => {
          return new Promise((resolve, reject) => {
            resolve({});
          });
        })

        store.dispatch(actionCreators.deleteArticle(stubArticle.id)).then(() => {
          expect(spy).toHaveBeenCalledTimes(1);
          done();
        });
    });

    it(`'deleteComment' should delete comment correctly`, (done) => {
      const spy = jest.spyOn(axios, 'delete')
        .mockImplementation(url => {
          return new Promise((resolve, reject) => {
            resolve({});
          });
        })

        store.dispatch(actionCreators.deleteComment(stubComment.id)).then(() => {
          expect(spy).toHaveBeenCalledTimes(1);
          done();
        });
    });

    it(`'updateArticle' should update article correctly`, (done) => {
      const spy = jest.spyOn(axios, 'put')
        .mockImplementation((url, article) => {
          return new Promise((resolve, reject) => {
            resolve({})
          });
        })
        const history = createBrowserHistory();
        const mockProps = {history};
        
      store.dispatch(actionCreators.updateArticle(stubArticle, mockProps)).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it(`'updateComment' should update comment correctly`, (done) => {
      const spy = jest.spyOn(axios, 'put')
        .mockImplementation((url, article) => {
          return new Promise((resolve, reject) => {
            resolve({})
          });
        })
        
      store.dispatch(actionCreators.updateComment(stubComment)).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
    
    it(`'login' should do login`, (done) => {
      const spyPut = jest.spyOn(axios, 'put')
        .mockImplementation((url, user) => {
          return new Promise((resolve, reject) => {
            resolve({})
          });
        })

        const spyGet = jest.spyOn(axios, 'get')
        .mockImplementation((url) => {
          return new Promise((resolve, reject) => {
            const result = {
              status:200,
              data:stubUser
            }
            resolve(result);
            reject();
          });
        })

        const history = createBrowserHistory();
        const mockProps = {history};
        
      store.dispatch(actionCreators.login(stubUser.id, mockProps)).then(() => {
        expect(spyPut).toHaveBeenCalledTimes(1);
        const action = store.getActions();
        expect(action[0].type).toBe(types.LOGIN);
        expect(action[0].id).toEqual(stubUser.id);
        done();
      });
    });

    it(`'logout' should do login`, (done) => {
      const spyPut = jest.spyOn(axios, 'put')
        .mockImplementation((url, user) => {
          return new Promise((resolve, reject) => {
            resolve({})
          });
        })

        const spyGet = jest.spyOn(axios, 'get')
        .mockImplementation((url) => {
          return new Promise((resolve, reject) => {
            resolve({
              status:200,
              data:{...stubUser, logged_in:false}
            })
            reject();
          });
        })

        const history = createBrowserHistory();
        const mockProps = {history};
        
      store.dispatch(actionCreators.logout(stubUser.id, mockProps)).then(() => {
        expect(spyPut).toHaveBeenCalledTimes(1);
        const action = store.getActions();
        expect(action[0].type).toBe(types.LOGOUT);
        expect(action[0].id).toEqual(stubUser.id);
        done();
      });
    });

});