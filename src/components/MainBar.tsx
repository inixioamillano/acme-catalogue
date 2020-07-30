import React from 'react'
import { Navbar } from 'react-bootstrap'
import { getUser, isLogged } from '../utils/AuthProvider'
import { Link } from 'react-router-dom'
require('dotenv').config()
export default function MainBar() {
    const theme = ['light', 'dark', 'custom'].find(t => t === process.env.REACT_APP_THEME) || 'custom'
    return (
        <div>
            <Navbar className={`nav-var-${theme}`}>
                <Navbar.Brand>
                <img
                    alt=""
                    src="/acme-corp.png"
                    height="30"
                    className="d-inline-block sticky align-top centered"
                />
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    {isLogged() ? <Navbar.Text>
                    {getUser().username}
                    </Navbar.Text> : <Link to="/login">Login</Link>}
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
