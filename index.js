const mongoose = require('mongoose')
const express = require('express')

const app = express()

const bodyParser = require('body-parser');
// 2. let know your app you will be using it
app.use(bodyParser.urlencoded({ extended: true }));



app.set("view engine", "hbs");
app.set("views", __dirname + "/views");


mongoose
  .connect('mongodb://127.0.0.1:27017/imdb')
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

  const movieSchema = new mongoose.Schema({
    title:String,
    year:Number,
    director:String,
    duration:String,
    genre: [String],
    rate:{
        type:Number,
        min:0,
        max:10
    },
    poster:String

},
{timestamps:true})



const Movie = mongoose.model('Movies',movieSchema)

//make a get route
// when you recieve a request on the '/' route a hbs page called homepage.hbs should render
// homepage.hbs should just have "homepage" as text

app.get('/',(req,res)=>{
    res.render('homepage')
})

//route for displaying all of my movies
app.get('/movies',async (req,res)=>{
    //.find() always returns an array
    try{
        const movies = await Movie.find()
        res.render('all-movies',{movies})
     
    }
    catch(err){
        console.log(err)
    }
   /*  Movie.find()
    .then(movies=>{
        console.log(movies)
        //can only pass objects to the handlebars page
        res.render('all-movies',{movies})
    }) 
    catch((err)=>{console.log(err)})*/
})

//route params
app.get('/godfather',(req,res)=>{
    Movie.findOne({title:"The Godfather"})
    .then((movie)=>{
        res.render('godfather',movie)
    })
})


app.get('/movies/information',(req,res)=>{
    res.send('information')
})
app.get('/movies/:title/',(req,res)=>{
    console.log(req.params)
    Movie.findOne({title:req.params.title})
    .then(oneMovie=>{
        console.log(oneMovie)
        res.render('movie-details',oneMovie)
    })
})


app.get('/search',(req,res)=>{
    console.log(req.query)
    Movie.find({$or:[{title:{$regex:req.query.title}},{director:{$regex:req.query.director}}]})
    .then((searchResult)=>{
        console.log(searchResult)
        res.render('search',{searchResult})

    })
})

app.get('/search-exercise',(req,res)=>{
    console.log(req.query)
    Movie.findOne({title:req.query.title})
    .then((oneMovie)=>{
        console.log(oneMovie)
        res.render('search',oneMovie)
    })

})

app.post('/sign-up',(req,res)=>{
    console.log(req.body)
})

app.post('/movies/new',(req,res)=>{
    console.log(req.body)
    const {title,poster,director,rate,year} = req.body
    Movie.create({title,poster,director,rate,year})
    .then(()=>{
        res.redirect('/movies')
    })
})
//create a route to handle searching
//in the input field the user needs to put the full name of the movie
// this should take the user to the search page with the 1 movie they are looking for


app.listen(3000)


