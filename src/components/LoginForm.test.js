import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { getMockStore } from "../test-utils/mocks";
import * as ActionCreators from "../actions/todo";
import { Router, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import LoginForm from "./LoginForm";

const history = createBrowserHistory();




describe('<LoginForm />', () => {
    axios.get = jest.fn(() => Promise.resolve({ data: "mocked" }));
    const spyGetUser= jest.spyOn(ActionCreators, 'getUsers')
    .mockImplementation(() => {return dispatch => {};});
    const spySetLoginUser = jest.spyOn(ActionCreators, 'login')
     .mockImplementation((id, props) => {return dispatch => {};});
    
    afterEach(() => { jest.clearAllMocks() });

    it('should return if no user',() => {
        const noUserState = {
            articleData:{
                articles:[],
            selectedArticle:[]
        },
        userData:{
            users:null,
            loginedUser:null
        },
        commentData:{
            comments:[]
        }};
        const mockStore = getMockStore(noUserState);
        
        const component = mount(
        <Provider store={mockStore}>
            <Router history={history}>
                <LoginForm/>
            </Router>
        </Provider>
        );
    });

    it('should redirect if logined', () => {
        const loginedState = {
            articleData:{
                articles:[],
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
        }};
        const mockStore = getMockStore(loginedState);
        const component = mount(
        <Provider store={mockStore}>
            <Router history={history}>
                <LoginForm/>
            </Router>
        </Provider>
        );
        expect(component.find(Redirect).length).toBe(1);
    })

    
    it('should render login form',() => {
        const stubInitState = {
            articleData:{
                articles:[],
            selectedArticle:[]
        },
        userData:{
            users:[
                {
                    "id": 1,
                    "email": "swpp@snu.ac.kr",
                    "password": "iluvswpp",
                    "name": "Software Lover",
                    "logged_in": false
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
            loginedUser:null
        },
        commentData:{
            comments:[]
        }};
        const mockStore = getMockStore(stubInitState);
        const component = mount(
        <Provider store={mockStore}>
            <Router history={history}>
                <LoginForm/>
            </Router>
        </Provider>
        );
        expect(spyGetUser).toHaveBeenCalledTimes(1); 
    });

    it('should change state if typed', () => {
        const stubInitState = {
            articleData:{
                articles:[],
            selectedArticle:[]
        },
        userData:{
            users:[
                {
                    "id": 1,
                    "email": "swpp@snu.ac.kr",
                    "password": "iluvswpp",
                    "name": "Software Lover",
                    "logged_in": false
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
            loginedUser:null
        },
        commentData:{
            comments:[]
        }};
        const mockStore = getMockStore(stubInitState);
        const component = mount(
        <Provider store={mockStore}>
            <Router history={history}>
                <LoginForm/>
            </Router>
        </Provider>
        );

        const email="TEST_EMAIL";
        const password="TEST_PW";
        component.find("#email-input").simulate("change", {target:{value:email, id:"email-input"}});
        component.find("#pw-input").simulate("change", {target:{value:password, id:"pw-input"}});
        const loginInstance = component.find(LoginForm.WrappedComponent).instance();
        expect(loginInstance.state["email-input"]).toEqual(email);
        expect(loginInstance.state["pw-input"]).toEqual(password);
    });

    it('when typed wrong id, pw', () => {
        window.alert = jest.fn();
        const stubInitState = {
            articleData:{
                articles:[],
            selectedArticle:[]
        },
        userData:{
            users:[
                {
                    "id": 1,
                    "email": "swpp@snu.ac.kr",
                    "password": "iluvswpp",
                    "name": "Software Lover",
                    "logged_in": false
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
            loginedUser:null
        },
        commentData:{
            comments:[]
        }};
        const mockStore = getMockStore(stubInitState);
        const component = mount(
        <Provider store={mockStore}>
            <Router history={history}>
                <LoginForm/>
            </Router>
        </Provider>
        );
        const wrapper = component.find("#login-button");
        wrapper.simulate('click');
        expect(spySetLoginUser).toHaveBeenCalledTimes(0);
    });


    it('when typed right id, pw', () => {
        window.alert = jest.fn();
        const stubInitState = {
            articleData:{
                articles:[],
            selectedArticle:[]
        },
        userData:{
            users:[
                {
                    "id": 1,
                    "email": "swpp@snu.ac.kr",
                    "password": "iluvswpp",
                    "name": "Software Lover",
                    "logged_in": false
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
            loginedUser:null
        },
        commentData:{
            comments:[]
        }};
        const mockStore = getMockStore(stubInitState);
        const component = mount(
        <Provider store={mockStore}>
            <Router history={history}>
                <LoginForm/>
            </Router>
        </Provider>
        );
        const wrapper = component.find("#login-button");
        component.find(LoginForm.WrappedComponent).setState({"email-input":"swpp@snu.ac.kr", "pw-input":"iluvswpp"});
        wrapper.simulate('click');
        expect(spySetLoginUser).toHaveBeenCalledTimes(1);
    });


});
