const express = require('express');
const router = express.Router();
const modelProduct = require('../models/m-product.js');
const validator = require('../utils/validator.js');

const formidable = require('formidable');
const fs = require('fs');

router.get('/shop/tags', function (req, res) {
  modelProduct.getTags(true, function (data) {
    res.json(data);
  });
})

router.get('/shop', function (req, res) {
  let filter = req.query;

  modelProduct.getProductList(filter, function (data) {
    res.json(data);
  });
})

router.get('/shop/:id', function (req, res) {
  let id = req.params.id;

  modelProduct.getShopProductById(id, function (product, similarProductList) {
    res.json({
      product: product,
      similarProductList: similarProductList
    });
  });
})

router.put('/shop/increase-view/:id', function (req, res) {
  let id = req.params.id;
  let newViews = Number(req.body.ProductViews);

  modelProduct.increaseViews(id, newViews, function (data) {
    res.json(data);
  });
})

router.get('/tags', function (req, res) {
  modelProduct.getTags(false, function (data) {
    res.json(data);
  });
})

router.get('/', function (req, res) {
  let filter = req.query;
  filter.resultQuantity = Number(filter.resultQuantity);
  filter.pageNum = Number(filter.pageNum);

  modelProduct.search(
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
  const form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    const productImage = files.productImage;
    const product = {
      ProductName: fields.productName,
      ProductPublisher: fields.productPublisher,
      ProductDimensions: fields.productDimensions,
      ProductPublishDate: fields.productPublishDate,
      FkProductCategory_Id: Number(fields.productCategory),
      FkProductTag_Id: Number(fields.productTag),
      FkDisplayStatus_Id: Number(fields.productDisplay),
      ProductPrice: Number(fields.productPrice),
      ProductSalePercent: Number(fields.productSalePercent),
      ProductQuantity: Number(fields.productQuantity),
      ProductOrder: Number(fields.productOrder),
      ProductPages: Number(fields.productPages),
      ProductImage: '',
      ProductDescription: fields.productDescription,
    };

    console.log(product);

    const checkValidateData = new Promise(function (resolve) {
      modelProduct.checkFk(
        product.FkProductCategory_Id,
        product.FkProductTag_Id,
        product.FkDisplayStatus_Id,
        function (checkFk) {
          const checkProductName = validator.checkPattern(
            product.ProductName,
            /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{3,199})$/
          );

          const checkProductPublisher = validator.checkPattern(
            product.ProductPublisher,
            /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{3,199})$/
          );

          const checkProductDimensions = validator.checkPattern(
            product.ProductDimensions,
            /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{3,199})$/
          );

          const checkProductPublishDate = validator.checkDate(
            product.ProductPublishDate, {
              day: 1,
              month: 1,
              year: 1800
            }, {
              day: 31,
              month: 12,
              year: 3000
            }
          );

          const checkProductPrice = validator.checkNumber(
            product.ProductPrice,
            0,
            999999999.99,
            0.01
          );

          const checkProductSalePercent = validator.checkNumber(
            product.ProductSalePercent,
            0,
            100,
            1
          );

          const checkProductQuantity = validator.checkNumber(
            product.ProductQuantity,
            0,
            999999999,
            1
          );

          const checkProductOrder = validator.checkNumber(
            product.ProductOrder,
            1,
            99,
            1
          );

          const checkProductPages = validator.checkNumber(
            product.ProductPages,
            1,
            99999,
            1
          );

          const checkProductImage = validator.checkFile(
            productImage,
            ['image/jpeg', 'image/webp'],
            0,
            2
          );

          const checkProductDescription = validator.checkPattern(
            product.ProductDescription,
            /^([A-Za-z0-9]{1})([\s\S]{49,1999})$/
          );

          if (
            checkProductName &&
            checkProductPublisher &&
            checkProductDimensions &&
            checkProductPublishDate &&
            checkProductPrice &&
            checkProductSalePercent &&
            checkProductQuantity &&
            checkProductOrder &&
            checkProductPages &&
            checkProductImage &&
            checkProductDescription &&
            checkFk
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
          modelProduct.findOne(
            'ProductName',
            product.ProductName,
            function (data) {
              if (data.length > 0) {
                res.json({
                  'result': 'fail',
                  'notification': 'Product name is exist',
                });

              } else {
                const pathFile = productImage.filepath;
                const fileExtension = productImage.mimetype.split('/').pop();

                const date = new Date().getTime();
                const slug = product.ProductName.toLowerCase().replace(/[^A-Za-z0-9\ ]/g, '').replace(/[\ ]+/g, '-');
                const prefixFileName = `${slug}_${date}`;
                const fileName = `${prefixFileName}.${fileExtension}`;
                product.ProductImage = fileName;

                product.ProductPublishDate = new Date(product.ProductPublishDate);
                modelProduct.add(product, function (data) {
                  console.log(data);
                  res.json({
                    'result': 'success',
                    'notification': `Add product completed \n Product name: ${product.ProductName}`,
                  });

                  (function uploadImage() {
                    const destPath = __dirname.replace('\\routes', '') + '\\public\\images\\products\\' + fileName;
                    console.log(destPath);

                    fs.copyFile(pathFile, destPath, (err) => {
                      if (err) throw err;

                      fs.unlink(pathFile, () => {
                        console.log('Temp file is deleted ' + pathFile);
                      });
                      console.log('Uploaded file ' + fileName);
                    });
                  })();
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
  });
})

// router.put('/:id', function (req, res) {
//   let product = {
//     ProductName: req.body.categoryName,
//     ProductOrder: Number(req.body.categoryOrder),
//     FkDisplayStatus_Id: Number(req.body.categoryDisplay),
//   };
//   console.log(product);

//   let checkValidateData = new Promise(function (resolve) {
//     modelProduct.checkFkDisplayStatus(
//       product.FkDisplayStatus_Id,
//       function (checkProductDisplay) {
//         let checkProductName = validator.checkPattern(
//           product.ProductName,
//           /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{0,199})$/
//         );

//         let checkProductOrder = validator.checkNumber(
//           product.ProductOrder,
//           1,
//           99,
//           1
//         );

//         if (checkProductName &&
//           checkProductOrder &&
//           checkProductDisplay
//         ) {
//           resolve(true);
//         } else {
//           resolve(false);
//         };
//       },
//     );
//   });

//   checkValidateData
//     .then(function (check) {
//       if (check === true) {
//         modelProduct.findOne(
//           'ProductName',
//           product.ProductName,
//           function (data) {
//             console.log(data);
//             if (
//               data.length > 0 && 
//               data[0].PkProductProduct_Id !== Number(req.params.id)
//             ) {
//               res.json({
//                 'result': 'fail',
//                 'notification': 'Product name is exist',
//               });

//             } else {
//               let categoryId = req.params.id;
//               modelProduct.update(
//                 categoryId,
//                 product,
//                 function (data) {
//                   console.log(data);
//                   res.json({
//                     'result': 'success',
//                     'notification': `Update category completed \n Product name: ${product.ProductName}`,
//                   });
//                 },
//               );
//             };
//           },
//         );
//       } else if (check === false) {
//         res.json({
//           'result': 'fail',
//           'notification': 'Wrong data format',
//         });
//       };
//     });
// })

// router.delete('/:id', function (req, res) {
//   modelProduct.delete(req.params.id, function (result) {
//     res.json(result);
//   });
// })

module.exports = router;