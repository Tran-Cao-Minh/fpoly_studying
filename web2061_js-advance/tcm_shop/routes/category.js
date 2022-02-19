const express = require('express');
const router = express.Router();
const modelCategory = require('../models/m-category.js');
const validator = require('../utils/validator.js');






// NHAP
// NHAP
// NHAP
// NHAP
// View
router.get('/', function (req, res) {
  let filter = req.query;
  filter.resultQuantity = Number(filter.resultQuantity);
  filter.pageNum = Number(filter.pageNum);

  modelCategory.search(
    filter,
    function (data, total) {
      res.json({
        data: data,
        total: total,
      });
    },
  );
})

// API
router.post('/', function (req, res, next) {
  let productCategory = {
    CategoryName: req.body.categoryName,
    CategoryOrder: Number(req.body.categoryOrder),
    FkDisplayStatus_Id: Number(req.body.categoryDisplay),
  };
  console.log(productCategory);

  let checkValidateData = new Promise(function (resolve) {
    modelCategory.checkFkDisplayStatus(
      productCategory.FkDisplayStatus_Id,
      function (checkCategoryDisplay) {
        let checkCategoryName = validator.checkPattern(
          productCategory.CategoryName,
          /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{0,199})$/
        );

        let checkCategoryOrder = validator.checkNumber(
          productCategory.CategoryOrder,
          1,
          99,
          1
        );

        if (checkCategoryName &&
          checkCategoryOrder &&
          checkCategoryDisplay
        ) {
          resolve(true);
        } else {
          resolve(false);
        };
      },
    );
  });

  checkValidateData
    .then(function (check) {
      if (check === true) {
        modelCategory.findOne(
          'CategoryName',
          productCategory.CategoryName,
          function (check) {
            if (check === true) {
              res.json({
                'result': 'fail',
                'notification': 'Category name is exist',
              });

            } else {
              modelCategory.add(productCategory, function (data) {
                console.log(data);
                res.json({
                  'result': 'success',
                  'notification': `Add category completed \n Category name: ${productCategory.CategoryName}`,
                });
              });
            };
          }
        );
      } else if (check === false) {
        res.json({
          'result': 'fail',
          'notification': 'Wrong data format',
        });
      };
    });
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

router.delete('/:id', function (req, res) {
  modelCategory.delete(req.params.id, function (result) {
    res.json(result);
  });
})

module.exports = router;