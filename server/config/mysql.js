//giving errors still working on it

const mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234"
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

