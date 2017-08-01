var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/robotdata'


var findRobots = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('robotdata');
  // Insert some documents
  collection
    .find({ "job": null })
    .toArray(function(err, result) {
      console.log("found ", result.length, "robots")
      callback(result);
  });
}
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  console.log('error?', err);
  console.log("Connected successfully to server");

  findRobots(db, function() {
    console.log('search is done');
    db.close();
  });
});
const express = require('express');
const app = express();

const mustacheExpress = require ('mustache-express');

app.use(express.static('public'));
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/index', function (request, response) {
  response.render('index', {collection.find});
});
app.get('/a_robot', function (request, response) {
  response.render('a_robot', {collection.find});
});
app.get('/robot/:username', function (request, response) {
  let robot = data.users.find(function(slave) {
    return slave.username.toLowerCase() === request.params.username;
  });
  response.render('a_robot' , {robot: robot});
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
