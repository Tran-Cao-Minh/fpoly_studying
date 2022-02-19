const express = require('express');
const router = express.Router();
const modelCategory = require('../models/m-category.js');
const validator = require('../utils/validator.js');

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

router.post('/', function (req, res) {
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
          function (data) {
            if (data.length > 0) {
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

router.put('/:id', function (req, res) {
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
          function (data) {
            console.log(data);
            if (
              data.length > 0 && 
              data[0].PkProductCategory_Id !== Number(req.params.id)
            ) {
              res.json({
                'result': 'fail',
                'notification': 'Category name is exist',
              });

            } else {
              let categoryId = req.params.id;
              modelCategory.update(
                categoryId,
                productCategory,
                function (data) {
                  console.log(data);
                  res.json({
                    'result': 'success',
                    'notification': `Update category completed \n Category name: ${productCategory.CategoryName}`,
                  });
                },
              );
            };
          },
        );
      } else if (check === false) {
        res.json({
          'result': 'fail',
          'notification': 'Wrong data format',
        });
      };
    });
})

router.delete('/:id', function (req, res) {
  modelCategory.delete(req.params.id, function (result) {
    res.json(result);
  });
})

module.exports = router;