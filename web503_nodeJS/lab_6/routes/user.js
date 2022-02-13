const express = require('express');
const router = express.Router();
const db = require('../models/database');
const formidable = require('formidable');
const fs = require('fs');
const bcrypt = require('bcrypt');

const modelUser = require('../models/m_user.js');

router.get('/overview', function (req, res, next) {
  res.render('user_overview');
})

router.get('/', function (req, res, next) {
  modelUser.read(function(data) {
    res.json(data);
  });
})

router.get('/add', function (req, res, next) {
  res.render('user_add');
})

router.post('/', function (req, res, next) {
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
      FkUserGender_Id: userGenderId,
      UserAddress: userAddress,
      FkUserRole_Id: userRoleId,
      FkUserStatus_Id: userStatusId,
      UserImage: fileName,
    };
    console.log(user);

    db.query('INSERT INTO user SET ?', user, function (err, data) {
      if (err) {
        throw err;
      };
      res.json({
        'notification': 'add user completed',
      });
    });
  });
})

router.get('/edit/:id', function (req, res, next) {
  let id = req.params.id;

  db.query(`
    SELECT PkCategory_Id, CategoryName 
    FROM product_category 
    `,
    function (err, categoryList) {
      if (err) {
        throw err;
      }

      db.query(
        `
          SELECT 
            PkProduct_Id,
            ProductName,
            ProductDescription,
            ProductImage,
            ProductPrice,
            FkCategory_Id,
            ProductDisplay,
            ProductPublisher,
            ProductPublishDate,
            ProductDimensions,
            ProductPages
          FROM product 
          WHERE PkProduct_Id = ${id}
          LIMIT 1
        `,
        function (err, data) {
          let date = new Date(data[0].ProductPublishDate);
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          if (month < 10) {
            month = '0' + month;
          }
          let day = date.getDate();
          if (day < 10) {
            day = '0' + day;
          }
          data[0].ProductPublishDate = `${year}-${month}-${day}`;
          res.render('product-edit', {
            product: data[0],
            categoryList: categoryList,
          });
        })
    })
})

router.post('/update', function (req, res, next) {
  // get data from edit router to update into database
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let productCategory = fields.productCategory;
    let productName = fields.productName.trim();
    let productPrice = fields.productPrice;
    let productDescription = fields.productDescription.trim();
    let productPublisher = fields.productPublisher.trim();
    let productPublishDate = fields.productPublishDate;
    let productDimensions = fields.productDimensions.trim();
    let productPages = fields.productPages;
    let productDisplay = fields.productDisplay;

    let checkUpdateProduct = files.productImage.size;
    let fileName = fields.oldImageFileName;
    if (checkUpdateProduct !== 0) {
      let pathFile = files.productImage.filepath;
      let fileExtension = files.productImage.mimetype.split('/').pop();

      let date = new Date();
      let slug = productName.toLowerCase().replace(/[^A-Za-z0-9\ ]/g, '').replace(/[\ ]+/g, '-');
      let prefix = slug + '_' + date.getTime();
      fileName = prefix + '.' + fileExtension;
      let destPath = __dirname.replace('\\routes', '') + '\\public\\images\\' + fileName;
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
          __dirname.replace('\\routes', '') + '\\public\\images\\' + oldImageFileName;
        fs.unlink(oldImageFileNamePath, () => {
          console.log('Old image file is deleted ' + oldImageFileNamePath);
        })
      })
    }

    const product = {
      FkCategory_Id: productCategory,
      ProductName: productName,
      ProductPrice: productPrice,
      ProductDescription: productDescription,
      ProductPublisher: productPublisher,
      ProductPublishDate: productPublishDate,
      ProductDimensions: productDimensions,
      ProductPages: productPages,
      ProductDisplay: productDisplay,
      ProductImage: fileName,
    };
    console.log(product);

    let PkProduct_Id = fields.productId;
    db.query(
      `
        UPDATE product SET ?
        WHERE PkProduct_Id = ${PkProduct_Id}
      `,
      product,
      function (err, data) {
        if (data.affectedRows === 0) {
          console.log(`Do not have product with ID ${PkProduct_Id} to update`);
        };
        res.redirect('/product');
      })
  })
})

router.delete('/:id', function (req, res) {
  let id = req.params.id;

  db.query(
    `
      SELECT UserImage
      FROM user 
      WHERE PkUser_Id = ${id}
      LIMIT 1
    `,
    function (err, data) {
      let oldImageFileNamePath =
        __dirname.replace('\\routes', '') + '\\public\\images\\' + data[0].UserImage;
      fs.unlink(oldImageFileNamePath, () => {
        console.log('Old image file is deleted ' + oldImageFileNamePath);
      })

      db.query(
        `
          DELETE FROM user
          WHERE PkUser_Id = ${id}
        `,
        function (err, data) {
          if (data.affectedRows === 0) {
            console.log(`Do not have product with ID ${PkUser_Id} to delete`);
          };
          res.redirect('/product');
        }
      )
    }
  )
})

module.exports = router;