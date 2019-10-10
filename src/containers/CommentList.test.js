import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import CommentList from './CommentList';
import * as ActionCreators from "../actions/todo";
import { Router } from 'react-router-dom';
import { getMockStore } from "../test-utils/mocks";
import { createBrowserHistory } from 'history';
import axios from 'axios';



jest.mock("../components/Comment", () => {
    return jest.fn(props => {
        const btn = props.editable? <div><button id="edit-comment-button" onClick={() => {props.onUpdate(props.id, props.content)}}>Edit</button>
        <button id="delete-comment-button" onClick={props.onDelete}>Delete</button></div> : <div></div>
        return(
        <div  className="Comment">
            <div> <span className="author">{props.author} </span>
            <span className="commentcontent">{props.content}</span>{btn}</div>
        </div>
        );
    })
});

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
        selectedArticle: {
            "id": 0,
            "author_id": 1,
            "title": "ARTICLE_TEST_TITLE_1",
            "content": "ARTICLE_TEST_CONTENT_1"
          },
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
        comments:[
            {
                "id": 1,
                "article_id": 0,
                "author_id": 2,
                "content": "ARTICLE_TEST_CONTENT_1"
              },
              {
                "id": 2,
                "article_id": 0,
                "author_id": 1,
                "content": "ARTICLE_TEST_CONTENT_2"
              },
              {
                "id": 3,
                "article_id": 0,
                "author_id": 1,
                "content": "ARTICLE_TEST_CONTENT_3"
              }
        ]
    }
}

const mockStore = getMockStore(stubInitState);
const history = createBrowserHistory();

describe('<CommentList/>', () => {
  axios.get = jest.fn(() => Promise.resolve({ data: "mocked" }));
    let commentList, spyGetAllComments;
    let spyCreateComment;
    beforeEach(() => {
        commentList = 
        (<Provider store={mockStore}>
            <Router history={history}>
                <CommentList article_id={0}/>
                </Router>
      </Provider>);
      spyCreateComment = jest.spyOn(ActionCreators,'createComment')
        .mockImplementation(cm => {return dispatch => {};});
    });
    afterEach(() => { jest.clearAllMocks() });

    it('should render comment', () => {
        const component = mount(commentList);
        const wrapper = component.find("div.Comment");
        expect(wrapper.length).toBe(3);
    });

    it('should handle input value change', () => {
      const content = "TEST_CONTENT";
      const component = mount(commentList);
      const wrapper = component.find("input");
      wrapper.simulate("change", {target: {value: content}});
      const commentInstance = component.find(CommentList.WrappedComponent).instance();
      expect(commentInstance.state.content).toEqual(content);
    });

    it('should call create comment when input value exists', () => {
      const content = "TEST_CONTENT";
      let component = mount(commentList);
      component.find(CommentList.WrappedComponent).instance().setState({content});
      component.find("#confirm-create-comment-button").at(0).update();
      const wrapper = component.find("#confirm-create-comment-button").at(0);
      wrapper.simulate('click');
      const wrapper_props = component.find(CommentList.WrappedComponent).instance().props;
      const newComment = {
        article_id:wrapper_props.article_id, 
        author_id: wrapper_props.loginedUser.id, 
        content
      }
      expect(spyCreateComment).toBeCalledTimes(1);
      expect(spyCreateComment).toHaveBeenCalledWith(newComment);
    });
    
    it('should call createcomment when no input value', () => {
      const content = "";
      const component = mount(commentList);
      component.find(CommentList.WrappedComponent).instance().state.content = content;
      const wrapper = component.find("#confirm-create-comment-button")
      wrapper.simulate('click');
      expect(spyCreateComment).toBeCalledTimes(0);
    });

    it('should exist delete & edit button when author', () => {
      const spyDeleteComment = jest.spyOn(ActionCreators,'deleteComment')
        .mockImplementation(id => {return dispatch => {};});
      const spyUpdateComment = jest.spyOn(ActionCreators,'updateComment')
        .mockImplementation(comment => {return dispatch => {};});
      const component = mount(commentList);
      const wrapper = component.find({editable:true}).at(0);
      wrapper.find("#delete-comment-button").simulate('click');
      expect(spyDeleteComment).toBeCalledTimes(1);
      wrapper.find("#edit-comment-button").simulate('click');
      expect(spyUpdateComment).toBeCalledTimes(1);
    });
});

