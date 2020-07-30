import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StarsRatingComponent from '../components/StarsRatingComponent';
import { MemoryRouter } from 'react-router-dom';
import { getRoundedValue, getAvg } from '../utils/utils';

Enzyme.configure({ adapter: new Adapter() })

describe('Rating percent bar', () => {
    
    it('should print "-" on screen when the movie has no reviews', () => {
        const rating = mount(<MemoryRouter><StarsRatingComponent id="ID" ratings={[]}/></MemoryRouter>)
        expect(rating.find("h1").text()).toContain("-")
    })

    it('should print the average value on screen when the movie has reviews', () => {
        const ratings = [{by: "u1", rating: 4}, {by: "u2", rating: 4}, {by: "u3", rating: 5}]
        const rating = mount(<MemoryRouter><StarsRatingComponent id="ID" ratings={ratings}/></MemoryRouter>)
        const expectedValue = getAvg(ratings.map(r => r.rating))
        expect(rating.find("h1").text()).toContain(expectedValue)
    })

})