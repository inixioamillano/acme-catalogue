import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme';
import MainBar from '../components/MainBar';
import App from '../App'
import { setUser } from '../utils/AuthProvider';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import {MemoryRouter} from 'react-router-dom'
import Login from '../screens/Login';

Enzyme.configure({ adapter: new Adapter() })

describe('Main bar component', ()=> {
    
    beforeEach(()=>{
        setUser({username: '', token: ''})
    })
    
    it('should render a link to Login screen if the user is not logged', () => {
        const wrapper = mount(<App><MainBar/></App>)
        expect(wrapper.find(Link)).toHaveLength(1)
        expect(wrapper.find(Link).text()).toContain("Login")
    })

    it('should render the username if the user is logged', () => {
        setUser({username: "testuser", token: "testtoken"})
        const wrapper = mount(<App><MainBar/></App>)
        expect(wrapper.find(Link)).toHaveLength(0)
        expect(wrapper.find(Navbar.Text).text()).toContain("testuser")
    })

    it('should appear in / route', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/' ]}>
                <App/>
            </MemoryRouter>
        );
        expect(wrapper.find(MainBar)).toHaveLength(1)
    })

    it('shouldn\'t appear in the Login screen', () => {
        const wrapper = mount(<Login/>);
        expect(wrapper.find(MainBar)).toHaveLength(0)
    })

})