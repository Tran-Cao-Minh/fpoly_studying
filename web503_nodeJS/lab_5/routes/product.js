const express = require('express');
const router = express.Router();
const db = require('../models/database');
const formidable = require('formidable');
const fs = require('fs');

// get product list data
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

// add product
router.post('/', function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let pathFile = files.productImage.filepath;
    let fileExtension = files.productImage.mimetype.split('/').pop();
    let productCategory = fields.productCategory;
    let productName = fields.productName.trim();
    let productPrice = fields.productPrice;
    let productDescription = fields.productDescription.trim();
    let productPublisher = fields.productPublisher.trim();
    let productPublishDate = fields.productPublishDate;
    let productDimensions = fields.productDimensions.trim();
    let productPages = fields.productPages;
    let productDisplay = fields.productDisplay;

    let date = new Date();
    let slug = productName.toLowerCase().replace(/[^A-Za-z0-9\ ]/g, '').replace(/[\ ]+/g, '-');
    let prefix = slug + '_' + date.getTime();
    let fileName = prefix + '.' + fileExtension;
    let destPath = __dirname.replace('\\routes', '') + '\\public\\images\\' + fileName;
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

    db.query('INSERT INTO product SET ?', product, function (err, data) {
      if (err) {
        throw err;
      };
      res.json({
        'notification': 'add product completed',
      });
    });
  });
});

// update product
router.put('/:id', function (req, res, next) {
  let PkProduct_Id = req.params.id;

  db.query(
    `
      SELECT ProductImage
      FROM product 
      WHERE PkProduct_Id = ${PkProduct_Id}
      LIMIT 1
    `,
    function (err, data) {
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

        let checkUpdateProductImage = files.productImage.size;
        let fileName = data[0].ProductImage;
        if (checkUpdateProductImage !== 0) {
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
            };
            fs.unlink(pathFile, () => {
              console.log('Temp file is deleted ' + pathFile);
            });
            console.log('Uploaded file ' + fileName);

            let oldImageFileName = data[0].ProductImage;
            let oldImageFileNamePath =
              __dirname.replace('\\routes', '') + '\\public\\images\\' + oldImageFileName;
            fs.unlink(oldImageFileNamePath, () => {
              console.log('Old image file is deleted ' + oldImageFileNamePath);
            });
          });
        };

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

        db.query(
          `
            UPDATE product SET ?
            WHERE PkProduct_Id = ${PkProduct_Id}
            LIMIT 1
          `,
          product,
          function (err, data) {
            if (err) {
              throw err;
            };
            res.json({
              'notification': 'update product completed',
            });
          }
        );
      });
    }
  );
});

// delete product
router.delete('/:id', function (req, res) {
  let PkProduct_Id = req.params.id;

  db.query(
    `
      SELECT ProductImage
      FROM product 
      WHERE PkProduct_Id = ${PkProduct_Id}
      LIMIT 1
    `,
    function (err, data) {
      let oldImageFileNamePath =
        __dirname.replace('\\routes', '') + '\\public\\images\\' + data[0].ProductImage;
      fs.unlink(oldImageFileNamePath, () => {
        console.log('Old image file is deleted ' + oldImageFileNamePath);
      });

      db.query(
        `
          DELETE FROM product
          WHERE PkProduct_Id = ${PkProduct_Id}
        `,
        function (err, data) {
          if (err) {
            throw err;
          };
          res.json({
            'notification': 'delete product completed',
          });
        }
      );
    }
  );
});

module.exports = router;