import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import ArticleWrite from "./ArticleWrite";
import * as ActionCreators from "../actions/todo";
import { Route,Router,Switch } from 'react-router-dom';
import { getMockStore } from "../test-utils/mocks";
import { createBrowserHistory } from 'history';
import { exportAllDeclaration } from '@babel/types';

const history = createBrowserHistory();

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
        users:[],
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
    }
}

const mockStore = getMockStore(stubInitState);

describe('<ArticleWrite /> when mode write', () => {
    let articleWrite, spyCreateArticle;

    beforeEach(() => {
        articleWrite = (
            <Provider store={mockStore}>
            <Router history={history}>
                <Switch>
                <Route path='/' exact render={() => <ArticleWrite mode="write"/>}/>
                </Switch>
                </Router>
      </Provider>
        )
    })

    afterEach(() => { jest.clearAllMocks() });

    it('should render write form', () => {
        const spyHistoryGoBack = jest.spyOn(history, 'goBack')
      .mockImplementation(() => {});
        const component = mount(articleWrite);
        const wrapper = component.find("#back-create-article-button").at(0);
        wrapper.simulate('click');
        expect(spyHistoryGoBack).toBeCalledTimes(1);
    });

    it('should create Article', () => {
        spyCreateArticle = jest.spyOn(ActionCreators, 'createArticle')
        .mockImplementation((ar, props) => {return dispatch => {};});
        const component = mount(articleWrite);
        const titleWrapper = component.find("#article-title-input");
        titleWrapper.simulate("change",{target:{value:"TEST_TITLE", id:"article-title-input"}});
        const contentWrapper = component.find("#article-content-input");
        contentWrapper.simulate("change",{target:{value:"TEST_CONTENT", id:"article-content-input"}});
        const wrapper = component.find("#confirm-create-article-button").at(0);
        wrapper.simulate('click');
        expect(spyCreateArticle).toBeCalledTimes(1);
    });

});

describe('<ArticleWrite /> when mode edit', () => {
    let articleWrite, spyUpdateArticle;

    beforeEach(() => {
        articleWrite = (
            <Provider store={mockStore}>
            <Router history={history}>
                <Switch>
                <Route path='/' exact render={() => <ArticleWrite mode="edit"/>}/>
                </Switch>
                </Router>
      </Provider>
        )
    })

    afterEach(() => { jest.clearAllMocks() });

    it('should render write form', () => {
        const component = mount(articleWrite);
        // TODO : check rendering
    });

    it('should update Article', () => {
        spyUpdateArticle = jest.spyOn(ActionCreators, 'updateArticle')
        .mockImplementation((ar, props) => {return dispatch => {};});
        const component = mount(articleWrite);
        const wrapper = component.find("#confirm-edit-article-button").at(0);
        wrapper.simulate('click');
        expect(spyUpdateArticle).toBeCalledTimes(1);
    });
});

describe('should return when no logined user', () => {
    const stubState = {
        articleData:{
            articles:[],
            selectedArticle:[]
        },
        userData:{
            users:[],
            loginedUser:null
        },
        commentData:{
            comments:[]
        }
    }

    const mockLogoutStore = getMockStore(stubState);

    it('should return', () => {
        const component = mount(
        <Provider store={mockLogoutStore}>
            <Router history={history}>
                <Switch>
                <Route path='/' exact render={() => <ArticleWrite mode="edit"/>}/>
                </Switch>
                </Router>
      </Provider>);
        // TODO: should check return
        
    });

    


});