const mysql = require('mysql');
let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lab_4_node_js'
});

db.connect(function() {
  console.log('Database connected !');
})

module.exports = db;