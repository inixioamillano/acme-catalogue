import React, { useState, useEffect } from 'react'
import CatalogueProps from '../props/CatalogueProps'
import {Container, Row, Col, InputGroup, FormControl, DropdownButton, Dropdown, ListGroup, ListGroupItem, Form} from 'react-bootstrap'
import MovieOrShowProps from '../props/MovieOrShowProps';
import CatalogueThumbnail from '../components/CatalogueThumbnail';
import MainBar from '../components/MainBar';

const orderCriteria = {
    ALPHABETICAL: 'ALPHABETICAL',
    NONE: 'NONE'
}

const filters = {
    NONE: 'NONE',
    MOVIE: 'MOVIE',
    TV_SHOW: 'TV_SHOW'
}

const filterText = (filter: string) => {
    switch(filter){
        case filters.MOVIE:
            return 'Movies';
        case filters.TV_SHOW:
            return 'TV Shows';
        default:
            return 'All';
    }
}

export default function Catalogue({catalogue}: CatalogueProps) {
    const [cat, setCat] = useState([])
    const [loading, setLoading] = useState(false);
    const [orderBy, setOrderBy] = useState(orderCriteria.NONE);
    const [filter, setFilter] = useState(filters.NONE);
    const [search, setSearch] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false);
    const theme = ['light', 'dark', 'custom'].find(t => t === process.env.REACT_APP_THEME) || 'custom'
    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/moviesandshows`)
        .then(res => res.json().then(json => {
            setCat(json)
            setLoading(false);
        }))
        .catch((e)=>console.log(e));
    }, []);

    if (loading) {
        return <div className="centered">Loading...</div>
    }

    return (
        <div>
            <MainBar/>
            <InputGroup style={{paddingLeft: '5%', paddingRight: '5%', marginTop: "2%"}}>
                <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-secondary"
                    title={filterText(filter)}
                    id="input-group-dropdown-2"
                    >
                    <Dropdown.Item onSelect={() => setFilter(filters.NONE)}>All</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setFilter(filters.MOVIE)}>Movies</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setFilter(filters.TV_SHOW)}>TV Shows</Dropdown.Item>
                </DropdownButton>
                <FormControl
                    onFocus={()=>setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                    onChange={(e) => {setSearch(e.target.value)}}
                    value={search}
                    placeholder="Search..."
                    aria-label="Search..."
                    aria-describedby="basic-addon2"
                    />
            </InputGroup>
            {showSuggestions && <ListGroup style={{paddingLeft: '5%', paddingRight: '5%', position: "absolute", width: '100%', zIndex: 2}}>
                {cat.filter((item: MovieOrShowProps) => item.title.toLowerCase().includes(search.toLowerCase()))
                    .filter((item: MovieOrShowProps) => (filter === filters.NONE || item.category === filter))
                    .map((suggestion: MovieOrShowProps) => <ListGroupItem className={theme} onClick={()=>{
                        setSearch(suggestion.title)
                        setShowSuggestions(false)
                    }}>{suggestion.title}</ListGroupItem>)
                }
            </ListGroup>}
            <Form style={{marginLeft: "5%", marginTop: "20px"}}>
                <i style={{display: 'inline-block'}} className="fa fa-sort-alpha-asc"></i>
                <Form.Check  style={{marginLeft: "5px", display: 'inline-block'}}
                    type="switch"
                    id="custom-switch"
                    label=""
                    value={orderBy === orderCriteria.ALPHABETICAL ? 1 : 0}
                    onChange={()=>{setOrderBy(orderBy === orderCriteria.ALPHABETICAL ? orderCriteria.NONE : orderCriteria.ALPHABETICAL)}}
                />
            </Form>
            <Container>
                <Row>
                    {cat.filter((item: MovieOrShowProps) => item.title.toLowerCase().includes(search.toLowerCase()))
                        .filter((item: MovieOrShowProps) => (filter === filters.NONE || item.category === filter))
                        .sort((a: MovieOrShowProps, b: MovieOrShowProps) => orderBy === orderCriteria.ALPHABETICAL ? a.title === b.title ? 0 : a.title < b.title ? -1 : 1 : 1)
                        .map((item: MovieOrShowProps) => {
                            return <Col xs={6} md={4} style={{marginTop: "5%"}}>
                                <CatalogueThumbnail item={item}/>
                            </Col>
                    })}
                </Row>
            </Container>
        </div>
    )
}
