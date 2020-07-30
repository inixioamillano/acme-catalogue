import React from 'react'
import { ProgressBar } from 'react-bootstrap'

type RatingPercentBarProps = {
    value: number,
    ratings: Array<{
        rating: number,
        by: string
    }>
}
export default function RatingPercentBar({value, ratings}:RatingPercentBarProps) {
    const timesRated = ratings.filter(r => r.rating === value).length
    return (
        <div>
            {value}<ProgressBar variant="warning" style={{color: "black"}} now={(timesRated/ratings.length)*100}/>
        </div>
    )
}
