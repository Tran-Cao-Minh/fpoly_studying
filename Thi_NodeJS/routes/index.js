const express = require('express');
const router = express.Router();

// connect db
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lab_3_node_js'
});

db.connect(function () {
  console.log('Database connected !');
});

// render view
router.get('/test-view', function (req, res) {
  res.render('test-view');
})

// create API
router.get('/', function (req, res) {
  const sql = `
    SELECT PkType_Id, TypeName 
    FROM product_type 
    WHERE TypeDisplay = 0
  `;

  db.query(sql, function (err, data) {
      if (err) throw err;
      res.json(data);
    }
  );
})




module.exports = router;