import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import ArticleList from './ArticleList';
import * as ActionCreators from "../actions/todo";
import { Route,Router,Switch } from 'react-router-dom';
import { getMockStore } from "../test-utils/mocks";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

jest.mock("../components/Article",() => {
    return jest.fn(props => {
        return(
        <div className="spyArticle">
            <div className="info"><span className="id">{props.id}</span>
            <button className="title" onClick={props.clickDetail}>{props.title}</button>
            <span className="account">{props.author}</span>
            </div>
            <div className="content">{props.content}</div>
        </div>);
    });
})

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
        selectedArticle:[]
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
            "logged_in": true
          },
    },
    commentData:{
        comments:[]
    }
}

const mockStore = getMockStore(stubInitState);

describe('<ArticleList />', () => {
    let articleList, spyGetArticles;

    beforeEach(() => {
        articleList = (
        <Provider store={mockStore}>
            <Router history={history}>
                <Switch>
                    <Route path='/' exact
                    render={() =><ArticleList title="Article List" /> } />
                </Switch>
                </Router>
      </Provider>
    );
    spyGetArticles = jest.spyOn(ActionCreators,'getArticles')
        .mockImplementation(() => {return dispatch => {};});
})

    

    it('should render Articles', () => {
        const component = mount(articleList);
        const wrapper = component.find('.spyArticle');
        expect(wrapper.length).toBe(2);
        expect(wrapper.at(0).find('.title').text()).toBe("ARTICLE_TEST_TITLE_1");
        expect(spyGetArticles).toBeCalledTimes(1);
    });

    it (`should call 'clickArticleHandler'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation(path => {});
      const component = mount(articleList);
      const wrapper = component.find('.spyArticle .title').at(0);
      wrapper.simulate('click');
      expect(spyHistoryPush).toHaveBeenCalledWith('/articles/0');
    });

    it('should call onClickCreate', () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation(path => {});
        const component = mount(articleList);
      const wrapper = component.find("#create-article-button").at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/articles/create');

    })

    it('should return if logouted', () => {
        const stubLogoutState = {
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
        const mockLogoutStore = getMockStore(stubLogoutState);
        articleList = (
            <Provider store={mockLogoutStore}>
                <Router history={history}>
                    <Switch>
                        <Route path='/' exact
                        render={() =><ArticleList title="Article List" /> } />
                    </Switch>
                    </Router>
          </Provider>
        );
        const component = mount(articleList);
    });

});

