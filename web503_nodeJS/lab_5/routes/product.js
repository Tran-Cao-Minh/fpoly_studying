const express = require('express');
const router = express.Router();
const db = require('../models/database');
const formidable = require('formidable');
const fs = require('fs');

router.get('/', function (req, res, next) {
  db.query(
    `
      SELECT 
        PkProduct_Id, ProductName, ProductPrice, CategoryName, ProductDisplay
      FROM 
        product p
      INNER JOIN product_category pc ON 
        p.FkCategory_Id = pc.PkCategory_Id
      ORDER BY 
        PkProduct_Id ASC
    `,
    function (err, data) {
      res.json(data);
    }
  );
});

module.exports = router;