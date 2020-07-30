const express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    app = express(),
    cors = require("cors"); 

const categories = {
    MOVIE: "Movies",
    TV_SHOW: "TV Shows"
}

const genres = {
    ADVENTURE: 'Adventure',
    MUSICAL: 'Musical',
    ANIMATION: 'Animation',
    SITCOM: 'Sitcom',
    TERROR: 'Terror'
}

let data = [
    {
        id: "DocWho", 
        title: "Doctor Who", 
        description: "One of the most iconic british TV Shows", 
        ratings: [{by: "jesus.mendez", rating: 4}, {by: "john_smith", rating: 5}, {by: 'luis1997', rating: 4}], 
        pic: "https://artworks.thetvdb.com/banners/posters/78804-52.jpg", 
        category: categories.TV_SHOW,
        genres: [genres.ADVENTURE]
    },{
        id: "MamMia", 
        title: "Mamma Mia!", 
        description: "You are getting married tomorrow. You don't really know who your father is, so you invite three candidates keeping it as a secret to your mom. For no apparent reason, everyone in the island spends the whole day singing ABBA's songs.", 
        ratings: [{by: "john_smith", rating: 5}], pic: "https://artworks.thetvdb.com/banners/movies/468/posters/468.jpg", 
        category: categories.MOVIE,
        genres: [genres.MUSICAL]
    },{
        id: "Toy", title: "Toy Story", 
        description: "To Infinity and beyond!", 
        ratings: [], 
        pic: "https://artworks.thetvdb.com/banners/movies/318/posters/318.jpg", 
        category: categories.MOVIE,
        genres: [genres.ADVENTURE, genres.ANIMATION]
    },{
        id: "MMHWGA", 
        title: "Mamma Mia! Here We Go Again", 
        description: "10 years later, you keep singing ABBA's songs", 
        ratings: [{by: "john_smith", rating: 4}], 
        pic: "https://artworks.thetvdb.com/banners/movies/385/posters/385.jpg", 
        category: categories.MOVIE,
        genres: [genres.MUSICAL]
    },{
        id: "ODAAT", 
        title: "One Day at a Time", 
        description: "A sitcom about a cuban-american family living in Los Angeles", 
        ratings: [{by: "luis1997", rating: 4}], 
        pic: "https://artworks.thetvdb.com/banners/posters/318363-3.jpg", 
        category: categories.TV_SHOW,
        genres: [genres.SITCOM]
    }
]

const users = [{
    username: "jesus.mendez",
    password: "iamjesus"
},{
    username: "john_smith",
    password: "jsmithpass"
},{
    username: "luis1997",
    password: "luis123"
}]   

const config = {
	key : "thisisthekeyforhiberus"
};

app.set('key', config.key);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors())

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    const logedUser = users.find((u)=> u.username === username && u.password === password)
    if (logedUser){
        const payload = {
			username: logedUser.username
		};
		const token = jwt.sign(payload, app.get('key'));
		res.json({
			token: token,
            username: logedUser.username
		});
    } else {
        res.json({message: "Usuario o contraseña incorrecta. Por favor, inténtalo de nuevo"})
    }
})

const protectedRoutes = express.Router(); 
protectedRoutes.use((req, res, next) => {
    const token = req.headers['access-token'];
	if (token) {
      jwt.verify(token, app.get('key'), (err, decoded) => {      
        if (err) {
          return res.json({ message: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          req.body = req.body;
          next();
        }
      });
    } else {
      res.send({ 
          message: 'Token no proveída.' 
      });
    }
});

app.get('/moviesandshows', (req, res) => {
	res.json(data);
});

app.get('/detailed/:id', (req, res) => {
    const {id} = req.params
    const detailed = data.find(d => d.id === id)
    if (detailed){
        res.json(detailed)
    } else {
        res.json({message: "Not found"})
    }
})

app.post('/rate', protectedRoutes, (req, res) => {
    const {token, username} = req.decoded;
    const {id, rating} = req.body
    const item = data.find(d => d.id === id)
    if (item){
        let {ratings} = item
        //Remove previous reviews from this user for this movie or show
        ratings = ratings.filter(r => r.by !== username)
        //Save the new rating)
        item.ratings = ratings.concat({by: username, rating})
        res.json(item);
    }else{
        res.json({message: "Not found"})
    }
})

app.listen(4000, () =>
    console.log(`ACME server listening on port 4000`),
);