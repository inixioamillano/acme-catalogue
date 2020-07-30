import React, { useState, FormEvent } from 'react'
import { Button, FormGroup, FormControl, Alert } from "react-bootstrap";
import {Redirect} from 'react-router-dom'
import { setUser, getUser } from '../utils/AuthProvider';
function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [token, setToken] = useState(getUser().token);
    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/login`, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => {
            res.json().then(body => {
                if (body.message){
                    setError(body.message);
                    return;
                }
                setUser(body)
                setToken(body.token)
            })
          }).catch(e => setError(e))
    }

    if (token !== ''){
        return <Redirect to='/'/>
    }
    
    return (
        <div className="login">
            <img alt="ACME Corporation" src="acme-corp.png" style={{display: 'block', margin: "auto"}}/>
            {error === null ? <div></div> : <Alert className="centered" variant="danger">
                    {error}
                </Alert>}
            <form style={{marginTop: 40}} onSubmit={handleSubmit}>
                <FormGroup controlId="user">
                <FormControl
                    placeholder="User"
                    autoFocus
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                </FormGroup>
                <FormGroup controlId="password">
                <FormControl
                    placeholder="Password"
                    value={password}                  
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                />
                </FormGroup>
                    <Button block disabled={!validateForm()} type="submit">
                        Login
                    </Button>
            </form>
        </div>
    )
}

export default Login