const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=7b2cdbf175a8eaecaff6e1f0da2a4320&query=' + latitude + ',' + longitude + '&units=m'
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect weather services')
    } else if (body.error) {
      callback('Unable to find location')
    } else {
      callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' deg out. But it feels like ' + body.current.feelslike + ' deg out.')
    }
  })
}

module.exports = forecast