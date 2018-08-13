const sqlite3 = require('sqlite3').verbose();
 
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
 
// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
