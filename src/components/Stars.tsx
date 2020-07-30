import React from 'react'
import { getRoundedValue } from '../utils/utils'

type StarsProps = {
    rating: number,
    interactive: boolean,
    setRating?: (rating: number) => void
}

export default function Stars({rating, interactive, setRating}: StarsProps) {
    
    const updateRating = (rating: number) => {
        if (interactive && setRating){
            setRating(rating)
        }
    }

    const classes = {
        full: 'fa fa-star',
        half: 'fa fa-star-half-full',
        empty: 'fa fa-star-o'
    }
    const roundedValue = getRoundedValue(rating);
    return (
        <div>
            <i id="star-1" className={roundedValue >= 1 ? classes.full : classes.empty} style={{color: '#FFC600'}} onClick={()=> updateRating(1)}></i>
            <i id="star-2" className={roundedValue === 1.5 ? classes.half : roundedValue >= 2 ? classes.full : classes.empty} style={{color: '#FFC600'}} onClick={()=> updateRating(2)}></i>
            <i id="star-3" className={roundedValue === 2.5 ? classes.half : roundedValue >= 3 ? classes.full : classes.empty} style={{color: '#FFC600'}} onClick={()=> updateRating(3)}></i>
            <i id="star-4" className={roundedValue === 3.5 ? classes.half : roundedValue >= 4 ? classes.full : classes.empty} style={{color: '#FFC600'}} onClick={()=> updateRating(4)}></i>
            <i id="star-5" className={roundedValue === 4.5 ? classes.half : roundedValue === 5 ? classes.full : classes.empty} style={{color: '#FFC600'}} onClick={()=> updateRating(5)}></i>
        </div>
    )
}
