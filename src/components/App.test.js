import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../test-utils/mocks";
import { createBrowserHistory } from 'history';
import App from "./App";
import { exportAllDeclaration } from "@babel/types";


import LoginForm from "./LoginForm";
import ArticleList from "../containers/ArticleList";
import ArticleDetail from "../containers/ArticleDetail";
import ArticleWrite from "../containers/ArticleWrite";
import axios from 'axios';


const mockStore = getMockStore({
        articleData:{
            articles:[],
        selectedArticle:{
            "id": 0,
            "author_id": 1,
            "title": "10 React JS Articles Every Web Developer Should Read",
            "content": "Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before."
          }
    },
    userData:{
        users:[],
        loginedUser:{}
    },
    commentData:{
        comments:[]
    }});

describe('<App />', () => {
  axios.get = jest.fn(() => Promise.resolve({ data: "mocked" }));
    let app, history;
    beforeEach(() => {
        history = createBrowserHistory();
        app = (
          <Provider store={mockStore}>
            <App history={history}/>
          </Provider>
        )
      });

      it('login page as start point', () => {
        const component = mount(app);
        const wrapper = component.find(LoginForm);
        expect(wrapper.length).toBe(1);
      });

      it('redirect to article list page', () => {
          history.push('/articles');
          const component = mount(app);
          const wrapper = component.find(ArticleList);
          expect(wrapper.length).toBe(1);
      });

      it('redirect to create page', () => {
        history.push('/articles/create');
        const component = mount(app);
        const wrapper = component.find('ArticleWrite[mode="create"]');
        expect(wrapper.length).toBe(1);
      });

      it('redirect to article edit page', () => {
        history.push('/articles/0/edit');
        const component = mount(app);
        const wrapper = component.find('ArticleWrite[mode="edit"]');
        expect(wrapper.length).toBe(1);
    });

    it('should be redirected to error page', () => {
        history.push('/aaa');
        const component = mount(app);
        expect(component.find('h1').text()).toBe('Not Founddd');
      })
      

});
