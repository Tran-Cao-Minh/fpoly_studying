const mysql = require('mysql');
let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tcm_shop'
});

db.connect(function() {
  console.log('Database connected !');
})

module.exports = db;