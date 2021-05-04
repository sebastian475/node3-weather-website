const request = require("request");

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=432fbb1e48877abf0fffe234cf12e073&query=${lat},${lon}`;
  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback(error, undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      callback(undefined, `${body.current.weather_descriptions}`);
    }
  });
};

module.exports = forecast;
