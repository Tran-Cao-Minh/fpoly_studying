const express = require('express');
const router = express.Router();
const modelUser = require('../models/m-user.js');
const validator = require('../utils/validator.js');

const formidable = require('formidable');
const fs = require('fs');
const bcrypt = require('bcrypt');



router.post('/mail', function (req, res) {
  const userEmail = req.body.userEmail;
  const emailSubject = req.body.emailSubject;
  const emailContent = req.body.emailContent;

  const mailer = require('../utils/mailer.js');
  mailer.sendMail(
    userEmail,
    emailSubject,
    emailContent
  );
  res.json({
    'notification': `Send mail to email: ${userEmail} completed`
  });
})

router.post('/', function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let pathFile = files.userImage.filepath;
    let fileExtension = files.userImage.mimetype.split('/').pop();

    let userFullName = fields.userFullName.trim();
    let userName = fields.userName.trim();
    let userPassword = fields.userPassword.trim();
    let userEmail = fields.userEmail.trim();
    let userGenderId = Number(fields.userGender);
    let userAddress = fields.userAddress.trim();
    let userRoleId = Number(fields.userRole);
    let userStatusId = Number(fields.userStatus);

    let date = new Date();
    let slug = userFullName.toLowerCase().replace(/[^A-Za-z0-9\ ]/g, '').replace(/[\ ]+/g, '-');
    let prefix = slug + '_' + date.getTime();
    let fileName = prefix + '.' + fileExtension;
    let destPath = __dirname.replace('\\routes', '') + '\\public\\images\\user\\' + fileName;
    console.log(destPath);

    fs.copyFile(pathFile, destPath, (err) => {
      if (err) {
        throw err;
      };
      fs.unlink(pathFile, () => {
        console.log('Temp file is deleted ' + pathFile);
      });
      console.log('Uploaded file ' + fileName);
    });

    let salt = bcrypt.genSaltSync(10);
    let userPasswordEncoded = bcrypt.hashSync(userPassword, salt);

    const user = {
      UserFullName: userFullName,
      UserName: userName,
      UserPassword: userPasswordEncoded,
      UserEmail: userEmail,
      UserGender: userGenderId,
      UserAddress: userAddress,
      FkUserRole_Id: userRoleId,
      UserStatus: userStatusId,
      UserImage: fileName,
    };
    console.log(user);

    modelUser.add(user, function (data) {
      console.log(data);
      res.json({
        'notification': 'register completed',
      });
    });
  });
})

router.post('/check-login', function (req, res) {
  let userName = req.body.userName;
  let userPassword = req.body.userPassword;

  modelUser.checkLogin(userName, function (data) {
    if (data.length <= 0) {
      let notification = 'User name does not exist';
      res.redirect(
        `/login?userName=${userName}&userPassword=${userPassword}&notification=${notification}`
      );

    } else {
      let user = data[0];
      let passwordFromDatabase = user.UserPassword;

      let result = bcrypt.compareSync(userPassword, passwordFromDatabase);
      if (result === true) {
        console.log('Login successfully');

        let session = req.session;
        session.logged = true;
        session.userName = userName;
        session.userId = user.PkUser_Id;

        if (session.back !== undefined) {
          console.log(session.back);
          res.redirect(session.back);

        } else {
          res.redirect('/account-detail');
        };

      } else {
        console.log('Login failed');
        let notification = 'You entered the wrong password';
        res.redirect(
          `/login?userName=${userName}&userPassword=${userPassword}&notification=${notification}`
        );
      };
    };
  });
})

router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
})

router.get('/:id', function (req, res, next) {
  modelUser.readById(req.params.id, function (data) {
    res.json(data[0]);
  });
})

router.put('/:id', function (req, res, next) {
  // get data from edit router to update into database
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let userFullName = fields.userFullName.trim();
    let userEmail = fields.userEmail.trim();
    let userGenderId = Number(fields.userGender);
    let userAddress = fields.userAddress.trim();
    let userRoleId = Number(fields.userRole);
    let userStatusId = Number(fields.userStatus);

    let checkUpdateImage = files.userImage.size;
    let fileName = fields.oldImageFileName;
    if (checkUpdateImage !== 0) {
      let pathFile = files.userImage.filepath;
      let fileExtension = files.userImage.mimetype.split('/').pop();

      let date = new Date();
      let slug = userFullName.toLowerCase().replace(/[^A-Za-z0-9\ ]/g, '').replace(/[\ ]+/g, '-');
      let prefix = slug + '_' + date.getTime();
      fileName = prefix + '.' + fileExtension;
      let destPath = __dirname.replace('\\routes', '') + '\\public\\images\\user\\' + fileName;
      console.log(destPath);

      fs.copyFile(pathFile, destPath, (err) => {
        if (err) {
          throw err;
        }
        fs.unlink(pathFile, () => {
          console.log('Temp file is deleted ' + pathFile);
        })
        console.log('Uploaded file ' + fileName);

        let oldImageFileName = fields.oldImageFileName;
        let oldImageFileNamePath =
          __dirname.replace('\\routes', '') + '\\public\\images\\user\\' + oldImageFileName;
        fs.unlink(oldImageFileNamePath, () => {
          console.log('Old image file is deleted ' + oldImageFileNamePath);
        })
      })
    }

    const user = {
      UserFullName: userFullName,
      UserEmail: userEmail,
      UserGender: userGenderId,
      UserAddress: userAddress,
      FkUserRole_Id: userRoleId,
      UserStatus: userStatusId,
      UserImage: fileName,
    };
    console.log(user);

    let PkUser_Id = req.params.id;
    modelUser.update(PkUser_Id, user, function (data) {
      console.log(data);
      res.json({
        'notification': 'update user completed',
      });
    })
  })
})

router.get('/update/password', function (req, res) {
  if (req.session.logged === true) {
    let PkUser_Id = req.session.userId;

    let userPassword = req.query.userPassword.trim();
    let salt = bcrypt.genSaltSync(10);
    let userPasswordEncoded = bcrypt.hashSync(userPassword, salt);

    modelUser.update(
      PkUser_Id, {
        UserPassword: userPasswordEncoded,
      },
      function (data) {
        console.log(data);
        res.redirect('/user/logout');
      }
    );

  } else {
    res.json({
      'notification': 'you must be update password at a browser',
    });
  };
})

router.post('/get-new/password', function (req, res) {
  let UserEmail = req.body.userEmail;

  modelUser.getIdByEmail(UserEmail, function (data) {
    if (data.length <= 0) {
      let notification = 'User email does not exist';
      res.redirect(
        `/forget-password?notification=${notification}`
      );

    } else {
      let PkUser_Id = data[0].PkUser_Id;

      let userPassword = String(Math.floor(Math.random() * 900000) + 100000);
      let salt = bcrypt.genSaltSync(10);
      let userPasswordEncoded = bcrypt.hashSync(userPassword, salt);

      modelUser.update(
        PkUser_Id, {
          UserPassword: userPasswordEncoded,
        },
        function (data) {
          console.log(data);

          const mailer = require('../utils/mailer.js');
          mailer.sendMail(
            UserEmail,
            'Update new password',
            `Your new password is: ${userPassword}`,
          );

          req.session.destroy();
          res.redirect('/change-password-by-email-successfully');
        },
      );
    };
  });
})

// router.get('/', function (req, res) {
//   let filter = req.query;
//   filter.resultQuantity = Number(filter.resultQuantity);
//   filter.pageNum = Number(filter.pageNum);

//   modelUser.search(
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
//   const form = new formidable.IncomingForm();

//   form.parse(req, function (err, fields, files) {
//     const productImage = files.productImage;
//     const product = {
//       ProductName: fields.productName,
//       ProductPublisher: fields.productPublisher,
//       ProductDimensions: fields.productDimensions,
//       ProductPublishDate: fields.productPublishDate,
//       FkProductCategory_Id: Number(fields.productCategory),
//       FkProductTag_Id: Number(fields.productTag),
//       FkDisplayStatus_Id: Number(fields.productDisplay),
//       ProductPrice: Number(fields.productPrice),
//       ProductSalePercent: Number(fields.productSalePercent),
//       ProductQuantity: Number(fields.productQuantity),
//       ProductOrder: Number(fields.productOrder),
//       ProductPages: Number(fields.productPages),
//       ProductImage: '',
//       ProductDescription: fields.productDescription,
//     };

//     console.log(product);

//     const checkValidateData = new Promise(function (resolve) {
//       modelUser.checkFk(
//         product.FkProductCategory_Id,
//         product.FkProductTag_Id,
//         product.FkDisplayStatus_Id,
//         function (checkFk) {
//           const checkProductName = validator.checkPattern(
//             product.ProductName,
//             /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{3,199})$/
//           );

//           const checkProductPublisher = validator.checkPattern(
//             product.ProductPublisher,
//             /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{3,199})$/
//           );

//           const checkProductDimensions = validator.checkPattern(
//             product.ProductDimensions,
//             /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{3,199})$/
//           );

//           const checkProductPublishDate = validator.checkDate(
//             product.ProductPublishDate, {
//               day: 1,
//               month: 1,
//               year: 1800
//             }, {
//               day: 31,
//               month: 12,
//               year: 3000
//             }
//           );

//           const checkProductPrice = validator.checkNumber(
//             product.ProductPrice,
//             0,
//             999999999.99,
//             0.01
//           );

//           const checkProductSalePercent = validator.checkNumber(
//             product.ProductSalePercent,
//             0,
//             100,
//             1
//           );

//           const checkProductQuantity = validator.checkNumber(
//             product.ProductQuantity,
//             0,
//             999999999,
//             1
//           );

//           const checkProductOrder = validator.checkNumber(
//             product.ProductOrder,
//             1,
//             99,
//             1
//           );

//           const checkProductPages = validator.checkNumber(
//             product.ProductPages,
//             1,
//             99999,
//             1
//           );

//           const checkProductImage = validator.checkFile(
//             productImage,
//             ['image/jpeg', 'image/webp'],
//             0,
//             2
//           );

//           const checkProductDescription = validator.checkPattern(
//             product.ProductDescription,
//             /^([A-Za-z0-9]{1})([\s\S]{49,1999})$/
//           );

//           if (
//             checkProductName &&
//             checkProductPublisher &&
//             checkProductDimensions &&
//             checkProductPublishDate &&
//             checkProductPrice &&
//             checkProductSalePercent &&
//             checkProductQuantity &&
//             checkProductOrder &&
//             checkProductPages &&
//             checkProductImage &&
//             checkProductDescription &&
//             checkFk
//           ) {
//             resolve(true);
//           } else {
//             resolve(false);
//           };
//         },
//       );
//     });

//     checkValidateData
//       .then(function (check) {
//         if (check === true) {
//           modelUser.findOne(
//             'ProductName',
//             product.ProductName,
//             function (data) {
//               if (data.length > 0) {
//                 res.json({
//                   'result': 'fail',
//                   'notification': 'Product name is exist',
//                 });

//               } else {
//                 const pathFile = productImage.filepath;
//                 const fileExtension = productImage.mimetype.split('/').pop();

//                 const date = new Date().getTime();
//                 const slug = product.ProductName.toLowerCase().replace(/[^A-Za-z0-9\ ]/g, '').replace(/[\ ]+/g, '-');
//                 const prefixFileName = `${slug}_${date}`;
//                 const fileName = `${prefixFileName}.${fileExtension}`;
//                 product.ProductImage = fileName;

//                 product.ProductPublishDate = new Date(product.ProductPublishDate);
//                 modelUser.add(product, function (data) {
//                   console.log(data);
//                   res.json({
//                     'result': 'success',
//                     'notification': `Add product completed \n Product name: ${product.ProductName}`,
//                   });

//                   (function uploadImage() {
//                     const destPath = __dirname.replace('\\routes', '') + '\\public\\images\\products\\' + fileName;
//                     console.log(destPath);

//                     fs.copyFile(pathFile, destPath, (err) => {
//                       if (err) throw err;

//                       fs.unlink(pathFile, () => {
//                         console.log('Temp file is deleted ' + pathFile);
//                       });
//                       console.log('Uploaded file ' + fileName);
//                     });
//                   })();
//                 });
//               };
//             }
//           );
//         } else if (check === false) {
//           res.json({
//             'result': 'fail',
//             'notification': 'Wrong data format',
//           });
//         };
//       });
//   });
// })

// router.put('/:id', function (req, res) {
//   let product = {
//     ProductName: req.body.categoryName,
//     ProductOrder: Number(req.body.categoryOrder),
//     FkDisplayStatus_Id: Number(req.body.categoryDisplay),
//   };
//   console.log(product);

//   let checkValidateData = new Promise(function (resolve) {
//     modelUser.checkFkDisplayStatus(
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
//         modelUser.findOne(
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
//               modelUser.update(
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
//   modelUser.delete(req.params.id, function (result) {
//     res.json(result);
//   });
// })

module.exports = router;