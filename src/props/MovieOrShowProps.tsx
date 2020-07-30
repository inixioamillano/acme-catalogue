type ratingProps = {
    by: string,
    rating: number
}

type MovieOrShowProps = {
    id: string,
    title: string,
    description: string,
    ratings: Array<ratingProps>,
    pic: string,
    category: string
}

export default MovieOrShowProps;