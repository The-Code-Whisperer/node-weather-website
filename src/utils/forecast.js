const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1b3b1f0fba26d786af7452c839f95291&query=' + latitude + ',' + longitude + '&units=';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is ${body.current.temperature}°C out. It feels like ${body.current.feelslike}°C. The humidity is ${body.current.humidity}%.`);
        }
    })
}



module.exports = forecast;