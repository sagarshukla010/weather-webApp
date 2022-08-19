const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6ee37158c6481baa0456de8273601156&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the whether server!", undefined);
    } else if (response.body.error) {
      callback("Unable to find the location!", undefined);
    } else {
      const current = response.body.current;
      callback(undefined, current);
    }
  });
};

module.exports = forecast;
