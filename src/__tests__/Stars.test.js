import React from 'react'
import Stars from '../components/Stars'
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { getRoundedValue } from '../utils/utils';

Enzyme.configure({ adapter: new Adapter() })

describe("Stars component", () => {

    beforeAll(() => {
        global.fetch = jest.fn();
        //window.fetch = jest.fn(); if running browser environment
      });

    it('renders without crashing', () => {
        render(<Stars rating={0} interactive={false}/>)
    })

    it('renders the correct amount of stars', () => {
        const wrapper = render(<Stars rating={3} interactive={false}/>)
        expect(wrapper.find(".fa-star")).toHaveLength(3)
        expect(wrapper.find(".fa-star-o")).toHaveLength(2)
    })

    it('rounds correctly an average score to get any of this values: {1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5}', () => {
        const wrapper = render(<Stars rating={3.9} interactive={false}/>)
        expect(getRoundedValue(3.9)).toBe(3.5)
        expect(wrapper.find(".fa-star")).toHaveLength(3)
        expect(wrapper.find(".fa-star-half-full")).toHaveLength(1)
        expect(wrapper.find(".fa-star-o")).toHaveLength(1)
    })

})

