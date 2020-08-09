const path = require('path')
// this is a function rather than an object like usual
const express = require('express');
const hbs = require('hbs');


const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.set('view engine', 'hbs') // use hbs files
app.set('views', viewsPath) // go into viewsPath folder which was set as templates
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath)) // not even used rn for html pages but still uses the css and js

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Steven Kim'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Steven Kim'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: "Steven Kim",
        helpText: 'This is help text'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            console.log(location)
            console.log(forecastData)
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Steven Kim',
        errorMessage: "Help article not found."
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Steven Kim',
        errorMessage: "Page not found."
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})