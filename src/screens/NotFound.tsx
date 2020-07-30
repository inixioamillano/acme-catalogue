import React from 'react'
import { Link } from 'react-router-dom'
import MainBar from '../components/MainBar'

export default function NotFound() {
    return (<div>
            <MainBar/>
            <div className="centered" style={{marginTop: 30}}>
                <h1>You probably got lost... We didn't find anything here</h1>
                <Link to='/'>Return to catalogue</Link>
            </div>
        </div>
    )
}
