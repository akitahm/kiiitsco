const express = require('express')
const app = express()
const port = 3000

require('./utils/db')
const auth = require('./models/Auth')

const expressLayout = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.use(expressLayout)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index', { layout: 'layouts/main-layout' })
})

app.get('/about', (req, res) => {
    res.render('about', { layout: 'layouts/main-layout' })
})

app.get('/gallery', (req, res) => {
    res.render('gallery', { layout: 'layouts/main-layout' })
})

app.get('/contact-us', (req, res) => {
    res.render('contact-us', { layout: 'layouts/main-layout' })
})

app.get('/shop', (req, res) => {
    res.render('shop', { layout: 'layouts/main-layout' })
})

app.get('/cart', (req, res) => {
    res.render('cart', { layout: 'layouts/main-layout' })
})

app.get('/checkout', (req, res) => {
    res.render('checkout', { layout: 'layouts/main-layout' })
})

app.get('/my-account', (req, res) => {
    res.render('my-account', { layout: 'layouts/main-layout' })
})

app.get('/wishlist', (req, res) => {
    res.render('wishlist', { layout: 'layouts/main-layout' })
})

app.get('/shop-detail', (req, res) => {
    res.render('shop-detail', { layout: 'layouts/main-layout' })
})

app.get('/login', (req, res) => {
    res.render('login', { layout: false })
})

app.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const getUser = await auth.findOne({ username: username })

    if (!getUser) {
        res.redirect('/login')
    } else {
        if (password == getUser.password) {
            res.redirect('/')
        }
        else {
            res.redirect('/login')
        }
    }
})

app.get('/register', (req, res) => {
    res.render('register', { layout: false })
})

app.post('/register', (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    const newUser = new auth({
        username, email, password
    })

    newUser.save().then(() => res.redirect('/login'))
})


app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`)
})