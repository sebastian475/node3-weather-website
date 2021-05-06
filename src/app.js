const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const port = process.env.PORT || 3000;
const forecast = require("./utils/forecast");

const path = require("path");

console.log(__dirname);

console.log(`the file name is ${__filename}`);
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");

const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);

hbs.registerPartials(partialPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    Name: "Sebastian Dmello",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    Name: "Sebastian Dmello",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help me",
    message: "This is the help page",
    Name: "Sebastian Dmello",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "The address was not provided",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          res.send({ error });
        }
        res.send({
          location: location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    Name: "Sebastian Dmello",
    errorMessage: "The help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    Name: "Sebastian Dmello",
    errorMessage: "The page not found",
  });
});

app.listen(port, () => {
  console.log("server listening on port 3000");
});
