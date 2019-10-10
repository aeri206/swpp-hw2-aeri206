import React from 'react';
import { shallow } from 'enzyme';
import Comment from "./Comment";


describe("<Comment />", () => {
    it("should render proper author & content", () => {
        const component = shallow(<Comment editable={true} id={1} author={'TEST_AUTHOR'} content={'TEST_CONTENT'}/>);
        expect(component.find(".commentcontent").text()).toEqual('TEST_CONTENT');
        expect(component.find(".author").text()).toEqual('TEST_AUTHOR ');
    });

    it("should make prompt on edit mode, input exists", () => {
        window.prompt = jest.fn(() => "TEST_INPUT");
        const mockUpdate = jest.fn();
        const component = shallow(<Comment editable={true} id={1} onUpdate={mockUpdate}/>);
        const wrapper = component.find("#edit-comment-button").at(0);
        wrapper.simulate('click');
        expect(mockUpdate).toHaveBeenCalledTimes(1);
        expect(mockUpdate).toHaveBeenCalledWith(1,"TEST_INPUT");
    });

    it("should make prompt on edit mode, no input", () => {
        window.prompt = jest.fn(() => null);
        const mockUpdate = jest.fn();
        const component = shallow(<Comment editable={true} id={1} onUpdate={mockUpdate}/>);
        const wrapper = component.find("#edit-comment-button").at(0);
        wrapper.simulate('click');
        expect(mockUpdate).toHaveBeenCalledTimes(0);
    })

    it("should onClick Delete", () => {
        const mockDelete = jest.fn();
        const component = shallow(<Comment editable={true} id={1} onDelete={mockDelete}/>);
        const wrapper = component.find("#delete-comment-button").at(0);
        wrapper.simulate('click');
        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockDelete).toHaveBeenCalledWith(1);
    });

    it('when not editable', () => {
        const component = shallow(<Comment editable={false}/>);
        const editWrapper = component.find("#edit-comment-button");
        expect(editWrapper.length).toBe(0);
        const deleteWrapper = component.find("#delete-comment-button");
        expect(deleteWrapper.length).toBe(0);
    })
    
});