import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { getMockStore } from "../test-utils/mocks";
import LogoutForm from "./LogoutForm";
import * as ActionCreators from "../actions/todo";

describe('<LogoutForm /> ',() => {
    const stubInitState = {
        articleData:{
            articles:[],
        selectedArticle:[]
    },
    userData:{
        users:[],
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
    const spyLogout = jest.spyOn(ActionCreators, 'logout')
    .mockImplementation((id, props) => {return dispatch => {};});
    
    it('should remove logined user', () => {
        const mockStore = getMockStore(stubInitState);
        const component = mount(<Provider store={mockStore}><LogoutForm/></Provider>);
        const wrapper = component.find("#logout-button").at(0);
        wrapper.simulate('click');
        expect(spyLogout).toHaveBeenCalledTimes(1);
    })
})