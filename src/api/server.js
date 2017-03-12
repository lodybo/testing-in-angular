"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var server = app.listen(9004, function () {
    console.log("Listening on port %s...", server.address().port);
});

app.get("/", (req, res) => {
  res.send(200, "Hello World!");
});

app.post("/send/mail", (req, res) => {
  let response = {
    status: 200,
    body: {
      sendStatus: "Mail successfully sent",
      receiver: req.body.email
    }
  };
  
  res.status(response.status).send(response.body);
});