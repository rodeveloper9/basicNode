const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongo db
const dbURI = 'mongodb+srv://dbAdmin:czWAjMcX4u6hzQw4@nodetech.oov18.mongodb.net/nodeBlog?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => {
        console.log('connected to db')
        // listen for requests
        app.listen(3000);
    })
    .catch((error) => console.log('db error ===>', error))

// register view engine
app.set('view engine', 'ejs'); // by default it will look for views folder
// app.set('views', 'newViewFolder'); // this will change the default views folder to whtever we name

// middlewares
// for static files
app.use(express.static('public'));
// it passes all url data into object which can be accessed in request.body
app.use(express.urlencoded({ extended: true }));
// for console in evry request
app.use(morgan('dev'))

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about new blog'
    });

    blog.save()
        .then((result) => {
            console.log('data saved in db')
            res.send(result);
        })
        .catch((err) => console.log('error in saving data to db ===>', err))
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            console.log('all blogs fetched')
            res.send(result);
        })
        .catch((error) => console.log('error while fetching all blogs ===>', error))
})

app.get('/', (req, res) => {
    // const blogs = [
    //     { title: 'First Blog', snippet: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    //     { title: 'Second Blog', snippet: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' },
    //     { title: 'Third Blog', snippet: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ' }
    // ]
    // res.render('index', { title: 'Home', blogs })
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

// redirects
// app.get('/about-me', (req, res) => {
//     res.redirect('about')
// })

// blog routes
app.use('/blogs', blogRoutes);

// 404 pages
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})