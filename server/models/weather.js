const request = require('request-promise');

const API_KEY = 'b5e30c082efb9a1024c970cffefbd797';

class Weather {
    static retrieveByCity (city, callback) {
        request({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`,
            json: true
        })
        .then((res) => callback(res))
        .catch((err) => {
            console.log(err);
            callback({ error:'Could not reach OpenWeatherMap API.' });
        })
    }
}

module.exports = Weather