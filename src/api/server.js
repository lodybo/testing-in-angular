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

  // Before we check if we can send the mail, let's see if we have an email address.
  // We'll check for the presence of the "@" character.
  if (req.body.email.indexOf("@") === -1) {
    response.status = 400;
    response.body.sendStatus = "There was an error sending the email. Is the address correct?";
    response.body.receiver = "";
  }
  
  res.status(response.status).send(response.body);
});