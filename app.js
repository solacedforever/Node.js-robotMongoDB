const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const mustacheExpress = require ('mustache-express');
const url = 'mongodb://localhost:27017/robotdata'

var findSingleRobot = function(db,username, callback) {
  // Get the documents collection
  var collection = db.collection('robotdata');
  // Insert some documents
  collection
  .findOne( { username : username }, function(err, result) {
      callback(result);
  });
}
var findRobotJobs = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('robotdata');
  // Insert some documents
  collection
    .find({ "job": null })
    .toArray(function(err, result) {
      console.log("found ", result.length, "robots with no jobs")
      callback(result);
  });
}
var findAllRobots = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('robotdata');
  // Insert some documents
  collection
    .find()
    .toArray(function(err, result) {
      console.log("found ", result.length, "robots")
      callback(result);
  });
}
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  console.log('error?', err);
  console.log("Connected successfully to server");

  findAllRobots(db, function() {
    console.log('search is done');
    db.close();
  });
});
app.use(express.static('public'));
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
  MongoClient.connect(url, function(err,db){
    findAllRobots(db, function(result){
      res.render('index',{users:result})
    });
  });
});
app.get('/unemployed', function (req, res) {
  MongoClient.connect(url, function(err,db){
    findRobotJobs(db,function(result){
      res.render('index',{users:result})
    });
  });
});
app.get('/a_robot/:username', function (req, res) {
  MongoClient.connect(url,function(err,db){
    findSingleRobot(db, req.params.username, function(result){
        // let robot = result.find(function(member) {
        //   return member.username.toLowerCase() === req.params.username;
        // });
        console.log('robots name '  + result.name) ;
        res.render('a_robot' , {robot:result});
    });
  });
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
