const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) + //to convert the ?,etc on the url format
    ".json?access_token=pk.eyJ1Ijoic2FnYXJzaHVrbGEwMTAiLCJhIjoiY2w2dWxia3VyMWVwZzNkbjIwcWNvanQ3ayJ9.qRYT4ZJl_PNwdSQd4tQ-nQ&limit=1";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the location services!", undefined);
    } else if (response.body.features.length == 0) {
      callback("Unable to find location, try another search!", undefined);
    } else {
      const center = response.body.features[0].center;
      const data = {
        longitude: center[0],
        latitude: center[1],
        location: response.body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
