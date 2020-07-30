import React, { useState } from 'react'
import { getAvg } from '../utils/utils'
import Stars from './Stars'
import RatingPercentBar from './RatingPercentBar'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { isLogged, getUser } from '../utils/AuthProvider'

type RatingProps = {
    by: string,
    rating: number
}

type StarsRatingComponentProps = {
    ratings: Array<RatingProps>,
    id: string
}

export default function StarsRatingComponent({id, ratings}: StarsRatingComponentProps) {
    const [rating, setRating] = useState(ratings.find(r => r.by === getUser().username)?.rating || 3);
    const [reload, setReload] = useState(false);
    const avg = getAvg(ratings.map(r => r.rating))
    
    const postRating = () => {
        fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/rate`, {
            method: 'POST',
            body: JSON.stringify({id, rating}),
            headers: new Headers({
                'access-token': getUser().token,
                "Content-Type": "application/json"
            })
        })
        .then((res) => res.json().then(() => setReload(true)))
        .catch(e => console.log(e))
    }

    if (reload) {
        return <Redirect to={`/`}/>
    }
    
    return (
        <div>
            <Container>
                <Row>
                    <Col className="centered" md={6} sm={12}>    
                        <h1>{parseFloat(avg) || '-'}</h1>        
                        <Stars interactive={false} rating={parseFloat(avg)}/>
                        ({ratings.length} ratings)
                    </Col>
                    <Col md={6} sm={12}>
                        <RatingPercentBar value={1} ratings={ratings}/>
                        <RatingPercentBar value={2} ratings={ratings}/>
                        <RatingPercentBar value={3} ratings={ratings}/>
                        <RatingPercentBar value={4} ratings={ratings}/>
                        <RatingPercentBar value={5} ratings={ratings}/>        
                    </Col>
                </Row>    
                <hr />
                <Row>
                    <Col md={12} className="centered">
                        {isLogged() ? <div>
                                    <p>You can send or update your own review</p>
                                    <Stars setRating={(rating)=>setRating(rating)} interactive rating={rating}/>
                                    <Button style={{marginTop: 20}} onClick={()=>postRating()}>Save</Button>
                                </div> : <div>
                                <p>You must have an account to rate</p>
                                <Link to="/login">Log In</Link>
                            </div>}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
