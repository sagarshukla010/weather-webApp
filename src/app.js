const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

//Define path for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs"); // hbs used for dynamic content in the web page.
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather!",
    name: "Sagar Shukla",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me!",
    name: "Sagar Shukla",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Hi There! I hope you like the page..",
    title: "Help!",
    name: "Sagar Shukla",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sagar Shukla",
    errorMessage: "Help article not found!",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide the address here",
    });
  }

  const address = req.query.address;

  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    } else {

      forecast(longitude, latitude, (error, current) => {
        if (error) {
          return res.send({
            error: error,
          });
        } else {
          const fc =
            current.weather_descriptions[0] +
            ". It is currently" +
            " " +
            current.temperature +
            " degrees out. There is a " +
            current.feelslike +
            " % chance of rain";

          return res.send({
            forecast: fc,
            location: location,
            address: address,
          });
        }
      });
    }
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sagar Shukla",
    errorMessage: "Page not found!",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

//nodemon app.js -e js,hbs   --> everytime the server restarts the template does not load,
// so use this command to trigger the application
