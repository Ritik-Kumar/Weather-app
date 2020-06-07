const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

/**** Path for express config*** */
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../tempelates/views')
const partialsPath = path.join(__dirname, '../tempelates/partials')

/***** setting up views */
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

/********Setup Static Assets */
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ritik Kumar'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Ritik Kumar'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    name: 'Ritik Kumar',
    title: 'Help'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Must provide Address'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, dataForecast) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        forecast: dataForecast,
        location,
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
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 404,
    errorMessage: 'Help article not found',
    name: 'Ritik Kumar'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 404,
    errorMessage: 'Page not found',
    name: 'Ritik Kumar'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})