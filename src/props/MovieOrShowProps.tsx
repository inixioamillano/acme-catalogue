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
    category: string,
    genres: Array<string>
}

export default MovieOrShowProps;