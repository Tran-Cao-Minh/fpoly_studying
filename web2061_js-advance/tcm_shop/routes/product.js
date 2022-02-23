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

  modelProduct.getShopProductById(id, function (data) {
    res.json(data);
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

  form.parse(req, function(err, fields, files) {
    fs.unlink(files.productImage.filepath, () => {
      console.log('Temp file is deleted ' + files.productImage.filepath);
    });

    const product = {
      ProductName: fields.productName,
      ProductPublisher: fields.productPublisher,
      ProductDimensions: fields.productDimensions,
      ProductPublishDate: new Date(fields.productPublishDate),
      FkProductCategory_Id: Number(fields.productCategory),
      FkProductTag_Id: Number(fields.productTag),
      FkDisplayStatus_Id: Number(fields.productDisplay),
      ProductPrice: Number(fields.productPrice),
      ProductSalePercent: Number(fields.productSalePercent),
      ProductQuantity: Number(fields.productQuantity),
      ProductOrder: Number(fields.productOrder),
      ProductPages: Number(fields.productPages),
      ProductImage: files.productImage,
      ProductDescription: fields.productDescription,
    };

    console.log(product);

    const checkValidateData = new Promise(function (resolve) {
      modelProduct.checkFk(
        product.FkProductCategory_Id,
        product.FkProductTag_Id,
        product.FkDisplayStatus_Id,
        function (checkFk) {
          let checkProductName = validator.checkPattern(
            productProduct.ProductName,
            /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{0,199})$/
          );
  
          let checkProductOrder = validator.checkNumber(
            productProduct.ProductOrder,
            1,
            99,
            1
          );

          #
  
          if (
            checkProductName &&
            checkProductOrder &&
            checkProductDisplay &&
            checkFk
          ) {
            resolve(true);
          } else {
            resolve(false);
          };
        },
      );
    });



  });


  // checkValidateData
  //   .then(function (check) {
  //     if (check === true) {
  //       modelProduct.findOne(
  //         'ProductName',
  //         productProduct.ProductName,
  //         function (data) {
  //           if (data.length > 0) {
  //             res.json({
  //               'result': 'fail',
  //               'notification': 'Product name is exist',
  //             });

  //           } else {
  //             modelProduct.add(productProduct, function (data) {
  //               console.log(data);
  //               res.json({
  //                 'result': 'success',
  //                 'notification': `Add category completed \n Product name: ${productProduct.ProductName}`,
  //               });
  //             });
  //           };
  //         }
  //       );
  //     } else if (check === false) {
  //       res.json({
  //         'result': 'fail',
  //         'notification': 'Wrong data format',
  //       });
  //     };
  //   });
})

// router.put('/:id', function (req, res) {
//   let productProduct = {
//     ProductName: req.body.categoryName,
//     ProductOrder: Number(req.body.categoryOrder),
//     FkDisplayStatus_Id: Number(req.body.categoryDisplay),
//   };
//   console.log(productProduct);

//   let checkValidateData = new Promise(function (resolve) {
//     modelProduct.checkFkDisplayStatus(
//       productProduct.FkDisplayStatus_Id,
//       function (checkProductDisplay) {
//         let checkProductName = validator.checkPattern(
//           productProduct.ProductName,
//           /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{0,199})$/
//         );

//         let checkProductOrder = validator.checkNumber(
//           productProduct.ProductOrder,
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
//           productProduct.ProductName,
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
//                 productProduct,
//                 function (data) {
//                   console.log(data);
//                   res.json({
//                     'result': 'success',
//                     'notification': `Update category completed \n Product name: ${productProduct.ProductName}`,
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