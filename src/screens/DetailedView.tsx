import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router';
import StarsRatingComponent from '../components/StarsRatingComponent';
import MainBar from '../components/MainBar';

type DeatiledViewParams = {
    id: string
}

type DetailedViewProps = RouteComponentProps<DeatiledViewParams>;

function DetailedView({match}: DetailedViewProps) {

    const [details, setDetails] = useState({title: '', description: '', ratings: []});
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/detailed/${match.params.id}`)
        .then(res => res.json().then(json => {
            setDetails(json)
            setLoading(false)
        }))
        .catch((e)=> {
            console.log(e)
        });
    }, [match.params.id])

    if (loading) {
        return <div className="centered">Loading...</div>
    }else {
        return (<div>
            <MainBar />
            <div style={{paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%"}}>
                <h1>{details.title}</h1>
                <p>{details.description}</p>
                <hr/>
                <StarsRatingComponent id={match.params.id} ratings={details.ratings}/>
            </div>
        </div>
        )
    }
    
}

export default withRouter(DetailedView)
