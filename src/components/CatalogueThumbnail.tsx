import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

type ThumbnailProps = {
    item: {
        id:string,
        title: string,
        pic: string,
        category: string
    }
}

export default function CatalogueThumbnail({item}: ThumbnailProps) {
    const {title, pic, id, category} = item;
    const theme = ['light', 'dark', 'custom'].find(t => t === process.env.REACT_APP_THEME) || 'custom'
    return (
        <div>
            <Link to={`/detailed/${id}`} className="thumbnail"  style={{ textDecoration: 'none', color: 'Black' }} >
                <Card className={`zoom ${theme}`}>
                    <Card.Img style={{marginTop: 20, maxHeight: 256, objectFit: "contain"}} variant="top" className="card-image" src={pic} alt={title} />
                    <Card.Body className="centered">
                        <i className={category === "MOVIE" ? "fa fa-film" : "fa fa-tv"}></i>
                        <Card.Title>{title}</Card.Title>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    )
}
