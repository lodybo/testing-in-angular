var express = require("express");
var bodyParser = require("body-parser");
var app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(9004, function () {
    console.log("Listening on port %s...", server.address().port);
});

app.get("/", (req, res) => {
  res.send(200, "Hello World!");
});

app.post("/", (req, res) => {
  res.send(200, "Body received: " + JSON.stringify(req.body));
});