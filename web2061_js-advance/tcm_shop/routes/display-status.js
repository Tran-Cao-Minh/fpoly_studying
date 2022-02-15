const express = require('express');
const db = require('../models/database');
const router = express.Router();

// get display status information
router.get('/', function (req, res) {
  db.query(`
      SELECT
        PkDisplayStatus_Id,
          StatusName
      FROM 
        display_status
    `, 
    function (err, data) {
      res.json(data);
    },
  );
})


module.exports = router;