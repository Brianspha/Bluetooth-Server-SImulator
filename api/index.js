/**
  * @dev API initialisation code section start
  */
require("dotenv").config({
  path: "/environmentvariables/vars.env",
  encoding: "utf8"
});
var bodyParser = require("body-parser");
var express = require("express");
const app = express();
app.use(express.json());
const options = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "GET",
  headers: {
    Accept: "application/json",
    "Accept-Charset": "utf-8"
  }
};
const crypto = require("crypto");

/**
  * @dev variables  code section start
  */
let bicycles = [];
for (var i = 0; i < 3; i++) {
  bicycles.push({
    bikeId: crypto.randomBytes(16).toString("hex"),
    dockedAt: { name: "campus location", postion: [-33.3057, 26.5245] }
  });
}

console.log(JSON.stringify(bicycles));
/**
  * @dev Handlers  code section start
*/

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.send(bicycles);
});

app.post("/dockrequest", (req, res) => {
  console.log(req.body);
  bicycles.push(req.body);
  res.statusCode = 200;
  res.send(bicycles.includes(req.body));
});
app.post("/:rentrequest", (req, res) => {
  console.log(req.body);
  let rentrequest = req.body;
  console.log(rentrequest);
  bicycles = bicycles.filter(bicycle => {
    console.log(
      rentrequest.bikeId !== bicycle.bikeId,
      rentrequest.bikeId,
      bicycle.bikeId
    );
    return rentrequest.bikeId !== bicycle.bikeId;
  });
  console.log(bicycles);
  res.send(!bicycles.some(bicycle => bicycle.bikeId === rentrequest.bikeId));
});
const port = process.env.PORT || 3000;
console.log(`listening on port ${port} time: ${new Date()}`);
app.listen(3000, "0.0.0.0");
