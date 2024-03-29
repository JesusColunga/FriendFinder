// server.js

// Dependencies
//===============================================
var express = require("express");
var path = require("path");

// Express Configuration
//===============================================
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router
//===============================================
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Listener
//===============================================
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
