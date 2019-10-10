import React from 'react';
import { shallow, mount } from 'enzyme';
import WriteForm from "./WriteForm";

describe('<WriteForm />', () => {

    afterEach(() => { jest.clearAllMocks() });

    it('should change state when click preview tab', () => {
        const component = shallow(<WriteForm/>);
        const wrapper = component.find("#preview-tab-button");
        expect(wrapper.length).toBe(1);
        wrapper.at(0).simulate('click');
        expect(component.state().preview).toBe(true);
    });

    it('should change state when click preview tab', () => {
        const component = shallow(<WriteForm/>);
        const wrapper = component.find("#write-tab-button");
        expect(wrapper.length).toBe(1);
        wrapper.at(0).simulate('click');
        expect(component.state().preview).toBe(false);
    });

    it('should click back when edit mode', () => {
        const mockBack = jest.fn();
        const component = mount(<WriteForm edit={true} oldState={{title:"TEST_TITLE", content:"TEST_CONTENT" }} onClickBack={mockBack}/>);
        const wrapper = component.find("#back-edit-article-button");
        expect(wrapper.length).toBe(1);
        wrapper.at(0).simulate('click');
        expect(mockBack).toBeCalledTimes(1);
    })

    it('should change its state', () => {
        const content="TEST_CONTENT";
        const title="TEST_TITLE";
        const component = shallow(<WriteForm />);
        component.find("#article-title-input").simulate("change", {target:{value:title, id:"article-title-input"}});
        component.find("#article-content-input").simulate("change", {target:{value:content, id:"article-content-input"}});
        expect(component.state()["article-title-input"]).toEqual(title);
        expect(component.state()["article-content-input"]).toEqual(content);
    });

    it('loss different value', () => {
        const mockBack = jest.fn();
        window.confirm = jest.fn(() => false);
        const component = mount(<WriteForm edit={true} oldState={{title:"TEST_TITLE", content:"TEST_CONTENT" }} onClickBack={mockBack}/>);
        component.setState({...component.state(), "article-content-input":"CHANGED_CONTENT", "article-title-input":"CHANGED_TITLE" });
        component.find("#back-edit-article-button").at(0).simulate('click');
        expect(mockBack).toBeCalledTimes(0);
    });

    it('loss different value', () => {
        const mockBack = jest.fn();
        window.confirm = jest.fn(() => true);
        const component = mount(<WriteForm edit={true} oldState={{title:"TEST_TITLE", content:"TEST_CONTENT" }} onClickBack={mockBack}/>);
        component.setState({...component.state(), "article-content-input":"CHANGED_CONTENT", "article-title-input":"CHANGED_TITLE" });
        component.find("#back-edit-article-button").at(0).simulate('click');
        expect(mockBack).toBeCalledTimes(1);
    })

    
    

});