const express = require("express");
const exphbs = require('express-handlebars');
const path = require("path");

//Initializaions
const app = express();

//Settings
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine('.hbs',exphbs({
    layoutsDir: path.join( app.get('views'),"layouts")
}))
//Middlewares
app.use(express.urlencoded({ extended: false }));

//Global Variables

//Routes
app.get("/", (req, res) => {
  res.send("hola");
});
//Static Files
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
