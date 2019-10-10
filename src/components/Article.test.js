import React from 'react';
import { shallow } from 'enzyme';
import Article from './Article';

describe("<Article />", () => {
    it("first spec", () => {
        const component = shallow(<Article />);
        const wrapper = component.find(".account");
        expect(wrapper.length).toBe(1);
    })
});