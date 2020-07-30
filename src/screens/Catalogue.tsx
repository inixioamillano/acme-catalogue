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
    NONE: 'All',
    MOVIE: 'Movies',
    TV_SHOW: 'TV Shows'
}

const genres = ['Adventure', 'Musical', 'Animation', 'Sitcom', 'Terror']


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

    const itemsToShow = cat.filter((item: MovieOrShowProps) => item.title.toLowerCase().includes(search.toLowerCase()))
        .filter((item: MovieOrShowProps) => (filter === filters.NONE || item.category === filter || item.genres.includes(filter)))
        .sort((a: MovieOrShowProps, b: MovieOrShowProps) => orderBy === orderCriteria.ALPHABETICAL ? a.title === b.title ? 0 : a.title < b.title ? -1 : 1 : 1);

    return (
        <div>
            <MainBar/>
            <InputGroup style={{paddingLeft: '5%', paddingRight: '5%', marginTop: "2%"}}>
                <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-secondary"
                    title={filter}
                    id="input-group-dropdown-2"
                    >
                    <Dropdown.Item onSelect={() => {setFilter(filters.NONE)}}>All</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item onSelect={() => setFilter(filters.MOVIE)}>Movies</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setFilter(filters.TV_SHOW)}>TV Shows</Dropdown.Item>
                    <Dropdown.Divider/>
                    {genres.map(g => <Dropdown.Item key={g} onSelect={()=>setFilter(g)}>{g}</Dropdown.Item>)}
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
            {itemsToShow.length > 0 ?
            <Container>
                <Row>
                    {itemsToShow.map((item: MovieOrShowProps) => {
                            return <Col key={item.id} xs={6} md={4} style={{marginTop: "5%"}}>
                                <CatalogueThumbnail item={item}/>
                            </Col>
                    })}
                </Row>
            </Container> : <h2 className="centered">No results found for the current search filters</h2>}
        </div>
    )
}
