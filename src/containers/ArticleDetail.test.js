import React from 'react';
import { shallow, mount } from "enzyme";
import { Provider } from 'react-redux';
import ArticleDetail from "./ArticleDetail";
import * as ActionCreators from "../actions/todo";
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import { getMockStore } from "../test-utils/mocks";
import { createBrowserHistory } from 'history';
import axios from 'axios';

const history = createBrowserHistory();


describe('<ArticleDetail when author/>', () => {

  axios.get = jest.fn(() => Promise.resolve({ data: "mocked" }));

    const stubInitState = {
        articleData:{
            articles:[
            {
                "id": 0,
                "author_id": 1,
                "title": "ARTICLE_TEST_TITLE_1",
                "content": "ARTICLE_TEST_CONTENT_1"
              },
              {
                "id": 11,
                "author_id": 2,
                "title": "ARTICLE_TEST_TITLE_2",
                "content": "ARTICLE_TEST_CONTENT_2"
              },
        ],
        selectedArticle:
        {
            "id": 0,
            "author_id": 1,
            "title": "ARTICLE_TEST_TITLE_1",
            "content": "ARTICLE_TEST_CONTENT_1"
          }
        
    },
    userData:{
        users:[
            {
                "id": 1,
                "email": "swpp@snu.ac.kr",
                "password": "iluvswpp",
                "name": "Software Lover",
                "logged_in": true
              },
              {
                "id": 2,
                "email": "alan@turing.com",
                "password": "iluvswpp",
                "name": "Alan Turing",
                "logged_in": false
              },
              {
                "id": 3,
                "email": "edsger@dijkstra.com",
                "password": "iluvswpp",
                "name": "Edsger Dijkstra",
                "logged_in": false
              }
        ],
        loginedUser:{
            "id": 1,
            "email": "swpp@snu.ac.kr",
            "password": "iluvswpp",
            "name": "Software Lover",
            "logged_in": false
          },
    },
    commentData:{
        comments:[]
    }}
    
    const mockStore = getMockStore(stubInitState);

    let articleDetail, spyGetArticleDetal, spyDeleteArticle;

    beforeEach(() => {
        articleDetail = (
            <Provider store={mockStore}>
            <Router history={history}>
                <Switch>
                <Route path='/' exact component={ArticleDetail} />
                </Switch>
                </Router>
      </Provider>
        )
        spyGetArticleDetal = jest.spyOn(ActionCreators, 'getArticleDetail')
        .mockImplementation(id => {return dispatch => {};});
        spyDeleteArticle = jest.spyOn(ActionCreators, 'deleteArticle')
        .mockImplementation(id => {return dispatch => {};});

    })
    afterEach(() => { jest.clearAllMocks() });

    it('should render article detail', () => {
        const component = mount(articleDetail);
        const wrapper = component.find('.ArticleDetail');
        expect(wrapper.length).toBe(1);
        expect(spyGetArticleDetal).toBeCalledTimes(1);
    });

    it('should call onClickEdit when author', () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation(path => {});
      const component = mount(articleDetail);
      const wrapper = component.find("#edit-article-button").at(0);
      wrapper.simulate('click');
      expect(spyHistoryPush).toHaveBeenCalledWith('/articles/0/edit');
    });

    it('should call onClickDelete when author', () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation(path => {});
      const component = mount(articleDetail);
      const wrapper = component.find("#delete-article-button").at(0);
      wrapper.simulate('click');
      expect(spyHistoryPush).toHaveBeenCalledWith('/articles/');
      expect(spyDeleteArticle).toBeCalledTimes(1);
    })

    it('should call onClickBack', () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation(path => {});
      const component = mount(articleDetail);
      const wrapper = component.find("#back-detail-article-button").at(0);
      wrapper.simulate('click');
      expect(spyHistoryPush).toHaveBeenCalledWith('/articles/');
    })
})

describe('<ArticleDetail /> when cannot find author', () => {

const stubInitState = {
    articleData:{
        articles:[
          {
            "id": 11,
            "author_id": 2,
            "title": "ARTICLE_TEST_TITLE_2",
            "content": "ARTICLE_TEST_CONTENT_2"
          },
    ],
    selectedArticle:
    {
        "id": 11,
        "author_id": 2,
        "title": "ARTICLE_TEST_TITLE_2",
        "content": "ARTICLE_TEST_CONTENT_2"
      }
},
userData:{
    users:[
        {
            "id": 1,
            "email": "swpp@snu.ac.kr",
            "password": "iluvswpp",
            "name": "Software Lover",
            "logged_in": true
          }
    ],
    loginedUser:{
        "id": 1,
        "email": "swpp@snu.ac.kr",
        "password": "iluvswpp",
        "name": "Software Lover",
        "logged_in": true
      },
},
commentData:{
    comments:[]
}}

const mockStore = getMockStore(stubInitState);

let articleDetail;

beforeEach(() => {
    articleDetail = (
        <Provider store={mockStore}>
        <Router history={history}>
            <Switch>
            <Route path='/' exact component={ArticleDetail} />
            </Switch>
            </Router>
  </Provider>
    )

})
it ("cannot find author",() => {
    const component = mount(articleDetail);
      const wrapper = component.find("#article-author").at(0);
      expect(wrapper.text().length).toBe(0);
})

});

describe('<ArticleDetail /> when user is not author', () => {

    const stubInitState = {
        articleData:{
            articles:[
              {
                "id": 11,
                "author_id": 2,
                "title": "ARTICLE_TEST_TITLE_2",
                "content": "ARTICLE_TEST_CONTENT_2"
              },
        ],
        selectedArticle:
        {
            "id": 11,
            "author_id": 2,
            "title": "ARTICLE_TEST_TITLE_2",
            "content": "ARTICLE_TEST_CONTENT_2"
          }
    },
    userData:{
        users:[
            {
                "id": 1,
                "email": "swpp@snu.ac.kr",
                "password": "iluvswpp",
                "name": "Software Lover",
                "logged_in": true
              },
              {
                "id": 2,
                "email": "alan@turing.com",
                "password": "iluvswpp",
                "name": "Alan Turing",
                "logged_in": false
              }
        ],
        loginedUser:{
            "id": 1,
            "email": "swpp@snu.ac.kr",
            "password": "iluvswpp",
            "name": "Software Lover",
            "logged_in": true
          },
    },
    commentData:{
        comments:[]
    }}
    
    const mockStore = getMockStore(stubInitState);
    
    let articleDetail, spyGetArticleDetal, spyDeleteArticle;
    
    beforeEach(() => {
        articleDetail = (
            <Provider store={mockStore}>
            <Router history={history}>
                <Switch>
                <Route path='/' exact component={ArticleDetail} />
                </Switch>
                </Router>
      </Provider>
        )
    
    })
    it ("user is not author",() => {
        const component = mount(articleDetail);
        // TODO : author가 아닐떄 : 뭔가 버튼이 안뜨거나 해야함. 
    })
    });

    describe('<ArticleDetail /> when logouted', () => {

        const stubInitState = {
            articleData:{
                articles:[
                  {
                    "id": 11,
                    "author_id": 2,
                    "title": "ARTICLE_TEST_TITLE_2",
                    "content": "ARTICLE_TEST_CONTENT_2"
                  },
            ],
            selectedArticle:
            {
                "id": 11,
                "author_id": 2,
                "title": "ARTICLE_TEST_TITLE_2",
                "content": "ARTICLE_TEST_CONTENT_2"
              }
        },
        userData:{
            users:[],
            loginedUser:null
        },
        commentData:{
            comments:[]
        }}
        
        const mockStore = getMockStore(stubInitState);
        
        let articleDetail, spyGetArticleDetal, spyDeleteArticle;
        
        beforeEach(() => {
            articleDetail = (
                <Provider store={mockStore}>
                <Router history={history}>
                    <Switch>
                    <Route path='/' exact component={ArticleDetail} />
                    </Switch>
                    </Router>
          </Provider>
            )
        
        })
        it ("no login",() => {
            const component = mount(articleDetail);
            // TODO : login안되어있을때 Redirect 되는지 확인해야
        })
        });
        