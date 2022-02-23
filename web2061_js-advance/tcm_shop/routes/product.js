const express = require('express');
const router = express.Router();
const modelProduct = require('../models/m-product.js');
const validator = require('../utils/validator.js');

router.get('/shop/tags', function (req, res) {
  modelProduct.getTags(function (data) {
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

// router.get('/', function (req, res) {
//   let filter = req.query;
//   filter.resultQuantity = Number(filter.resultQuantity);
//   filter.pageNum = Number(filter.pageNum);

//   modelProduct.search(
//     filter,
//     function (data, total) {
//       res.json({
//         data: data,
//         total: total,
//       });
//     },
//   );
// })

// router.post('/', function (req, res) {
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
//             if (data.length > 0) {
//               res.json({
//                 'result': 'fail',
//                 'notification': 'Product name is exist',
//               });

//             } else {
//               modelProduct.add(productProduct, function (data) {
//                 console.log(data);
//                 res.json({
//                   'result': 'success',
//                   'notification': `Add category completed \n Product name: ${productProduct.ProductName}`,
//                 });
//               });
//             };
//           }
//         );
//       } else if (check === false) {
//         res.json({
//           'result': 'fail',
//           'notification': 'Wrong data format',
//         });
//       };
//     });
// })

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