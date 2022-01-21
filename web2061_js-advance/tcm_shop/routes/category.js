const express = require('express');
const router = express.Router();
const modelCategory = require('../models/category');

// View
router.get('/overview', function (req, res, next) {
  // db.query(
  //   `
  //     SELECT PkCategory_Id, CategoryName, CategoryOrder, CategoryDisplay
  //     FROM product_category
  //   `,
  //   function (err, data) {
  //     res.render('category-list', {
  //       categoryList: data
  //     });
  //   }
  // );

  let columnList = [
    {
      key: 'PkCategory_Id',
      name: 'ID',
      type: 'pk',
    },
    {
      key: 'CategoryName',
      name: 'Name',
      type: 'text',
    },
    {
      key: 'CategoryOrder',
      name: 'Order',
      type: 'text',
    },
    {
      key: 'CategoryDisplay',
      name: 'Display',
      type: 'text',
    },
  ]

  res.render('admin/category/category-overview', {
    columnList : columnList,
  });
})

// API
router.get('/', function (req, res, next) {
  let categoryList = modelCategory.list();
  res.json(categoryList); 
})

router.get('/add', function (req, res, next) {
  // res.render('category-add');
})

router.post('/store', function (req, res, next) {
  // get data form add router to add record into database
  // let categoryName = req.body.categoryName;
  // let categoryOrder = req.body.categoryOrder;
  // let categoryDisplay = req.body.categoryDisplay;

  // let productCategory = {
  //   CategoryName: categoryName,
  //   CategoryOrder: categoryOrder,
  //   CategoryDisplay: categoryDisplay,
  // };

  // db.query(
  //   `INSERT INTO product_category SET ?`, productCategory,
  //   function (err, data) {
  //     if (err) throw err;
  //     res.redirect('/category');
  //   }
  // )
})

router.get('/edit/:id', function (req, res, next) {
  // let id = req.params.id;

  // db.query(
  //   `
  //     SELECT PkCategory_Id, CategoryName, CategoryOrder, CategoryDisplay
  //     FROM product_category 
  //     WHERE PkCategory_Id = ${id}
  //     LIMIT 1
  //   `,
  //   function (err, data) {
  //     res.render('category-edit', {
  //       category: data[0]
  //     });
  //   }
  // )
})

router.post('/update', function (req, res, next) {
  // get data from edit router to update into database
  // let PkCategory_Id = req.body.categoryId;
  // let categoryName = req.body.categoryName;
  // let categoryOrder = req.body.categoryOrder;
  // let categoryDisplay = req.body.categoryDisplay;

  // let productCategory = {
  //   CategoryName: categoryName,
  //   CategoryOrder: categoryOrder,
  //   CategoryDisplay: categoryDisplay,
  // };

  // db.query(
  //   `
  //     UPDATE product_category SET ?
  //     WHERE PkCategory_Id = ${PkCategory_Id}
  //   `,
  //   productCategory,
  //   function (err, data) {
  //     if (data.affectedRows === 0) {
  //       console.log(`Do not have category with ID ${PkCategory_Id} to update`);
  //     };
  //     res.redirect('/category');
  //   }
  // )
})

router.get('/delete/:id', function (req, res) {
  // let id = req.params.id;

  // db.query(
  //   `
  //     DELETE FROM product_category
  //     WHERE PkCategory_Id = ${id}
  //   `,
  //   function (err, data) {
  //     if (data.affectedRows === 0) {
  //       console.log(`Do not have category with ID ${PkCategory_Id} to delete`);
  //     };
  //     res.redirect('/category');
  //   }
  // )
})

module.exports = router;