const express = require('express');
const sqlite3 = require('sqlite3').verbose();

var restapi = express();
 
// open database in memory
let db = new sqlite3.Database('./db/scidata.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

db.serialize(() => {
  db.each(`SELECT id as id, title as title FROM scidata`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + '\t' + row.title);
  });
});

/*
restapi.get('/data', function(req, res){
    db.get("SELECT value FROM counts", function(err, row){
        res.json({ "count" : row.value });
    });
});
*/

// have to connect this to a route. A rest api
db.get("SELECT shorttitle FROM scidata", function(err, row){
    console.log({ "count" : row.shorttitle });
});



// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
