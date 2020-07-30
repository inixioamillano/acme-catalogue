import React from 'react'
import { Navbar } from 'react-bootstrap'
import { getUser, isLogged } from '../utils/AuthProvider'
import { Link } from 'react-router-dom'
require('dotenv').config()
export default function MainBar() {
    let className;
    switch(process.env.REACT_APP_THEME){
        case 'custom':
            className="mainbar";
            break;
        case 'dark':
            className="bg-dark";
            break;
        case 'light':
            className="bg-light";
            break;
        default:
            className="mainbar"
            break;
    }
    return (
        <div>
            <Navbar className={className}>
                <Navbar.Brand>
                <img
                    alt=""
                    src="/acme-corp.png"
                    height="30"
                    className="d-inline-block sticky align-top centered"
                />
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    {isLogged() ? <Navbar.Text style={{color: className === 'bg-dark' ? 'white' : 'black'}}>
                    {getUser().username}
                    </Navbar.Text> : <Link to="/login">Login</Link>}
                    
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
