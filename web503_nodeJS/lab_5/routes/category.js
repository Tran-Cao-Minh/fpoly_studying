const express = require('express');
const router = express.Router();
const db = require('../models/database');

// get category list data
router.get('/', function (req, res, next) {
  db.query(
    `
      SELECT 
        PkCategory_Id, CategoryName, CategoryOrder, CategoryDisplay
      FROM 
        product_category
    `,
    function (err, data) {
      res.json(data);
    }
  );
});

// add category
router.post('/', function (req, res, next) {
  let categoryName = req.body.categoryName;
  let categoryOrder = req.body.categoryOrder;
  let categoryDisplay = req.body.categoryDisplay;

  let productCategory = {
    CategoryName: categoryName,
    CategoryOrder: categoryOrder,
    CategoryDisplay: categoryDisplay,
  };

  db.query(`INSERT INTO product_category SET ?`, productCategory,
    function (err, data) {
      if (err) {
        throw err;
      };
      res.json({
        'notification': 'add category completed',
      });
    }
  );
});

// update category
router.put('/:id', function (req, res, next) {
  let PkCategory_Id = req.params.id;

  let categoryName = req.body.categoryName;
  let categoryOrder = req.body.categoryOrder;
  let categoryDisplay = req.body.categoryDisplay;

  let productCategory = {
    CategoryName: categoryName,
    CategoryOrder: categoryOrder,
    CategoryDisplay: categoryDisplay,
  };

  db.query(
    `
      UPDATE 
        product_category SET ?
      WHERE 
        PkCategory_Id = ${PkCategory_Id}
    `,
    productCategory,
    function (err, data) {
      if (err) {
        throw err;
      };
      res.json({
        'notification': 'update category completed',
      });
    }
  );
});

// delete category
router.delete('/:id', function (req, res) {
  let PkCategory_Id = req.params.id;

  db.query(
    `
      DELETE FROM 
        product_category
      WHERE 
        PkCategory_Id = ${PkCategory_Id}
    `,
    function (err, data) {
      if (err) {
        throw err;
      };
      res.json({
        'notification': 'delete category completed',
      });
    }
  );
});

module.exports = router;