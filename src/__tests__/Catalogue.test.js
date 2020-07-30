import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme';
import {MemoryRouter} from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16';
import App from '../App'
import Catalogue from '../screens/Catalogue'
Enzyme.configure({ adapter: new Adapter() })

describe("Catalogue Thumbnail component", () => {

    it('renders without crashing', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/' ]}>
              <App/>
            </MemoryRouter>
          );
        expect(wrapper.find(Catalogue)).toHaveLength(1)
    })

})

