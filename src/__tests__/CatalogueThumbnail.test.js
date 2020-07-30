import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme';
import {Card} from 'react-bootstrap'
import Adapter from 'enzyme-adapter-react-16';
import App from '../App'
import CatalogueThumbnail from '../components/CatalogueThumbnail'
import { MemoryRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() })

describe("Catalogue Thumbnail component", () => {

    it('should crash on no item prop provided', () => {
        expect(() => shallow(<CatalogueThumbnail/>)).toThrowError();
    })

    it('should render on item prop provided', () => {
        const thumbnail = mount(<MemoryRouter><CatalogueThumbnail item={{title: "Test title", id: "ID", pic: 'picurl', category: "MOVIE"}}/></MemoryRouter>)
        expect(thumbnail.text()).toContain("Test title")
    })

})

