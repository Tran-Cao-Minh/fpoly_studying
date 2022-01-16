const express = require('express');
const formidable = require('formidable');
const fs = require('fs');

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

let mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'tcm_bookstore'
});

// </> USER
// home page
app.get('/', (req, res) => {
  db.query(`
    SELECT PkType_Id, TypeName 
    FROM product_type 
    WHERE TypeDisplay = 1
    `,
    function (err, typeList) {
      if (err) {
        throw err;
      }
      db.query(`
        SELECT 
          PkProduct_Id, ProductName, ProductImage, ProductPrice 
        FROM product 
        WHERE ProductDisplay = 1
        `,
        function (err, productList) {
          if (err) {
            throw err;
          }
          res.render('user/home', {
            typeList: typeList,
            productList: productList,
            getParentFolder: '',
          });
        })
    })
})
// end home page

// view product by category
app.get('/type/:typeId', (req, res) => {
  let FkType_Id = req.params.typeId;

  db.query(`
    SELECT PkType_Id, TypeName 
    FROM product_type 
    WHERE TypeDisplay = 1
    `,
    function (err, typeList) {
      if (err) {
        throw err;
      }
      db.query(`
        SELECT 
          PkProduct_Id, ProductName, ProductImage, ProductPrice 
        FROM product 
        WHERE FkType_Id = ${FkType_Id}
        `,
        function (err, productList) {
          if (err) {
            throw err;
          }
          res.render('user/home', {
            typeList: typeList,
            productList: productList,
            getParentFolder: '../',
          });
        })
    })
})
// end view product by category

// view product detail
app.get('/detail/:productId', (req, res) => {
  let PkProduct_Id = req.params.productId;

  db.query(`
    UPDATE product
    SET ProductViews = ProductViews + 1
    WHERE PkProduct_Id = ${PkProduct_Id}
    `,
    function (err, data) {
      if (err) {
        throw err;
      }
    })

  db.query(`
    SELECT PkType_Id, TypeName 
    FROM product_type 
    WHERE TypeDisplay = 1
    `,
    function (err, typeList) {
      if (err) {
        throw err;
      }
      db.query(`
        SELECT 
          ProductName, 
          ProductDescription, 
          ProductImage, 
          ProductPrice, 
          ProductPublisher,
          ProductPublishDate,
          ProductDimensions,
          ProductPages,
          ProductViews,
          FkType_Id
        FROM product
        WHERE PkProduct_Id = ${PkProduct_Id}
        LIMIT 1
        `,
        function (err, product) {
          if (err) {
            throw err;
          }
          res.render('user/product-detail', {
            typeList: typeList,
            product: product,
            getParentFolder: '../',
          });
        })
    })
})
// end view product detail

// end </> USER

// </> ADMIN
// home page
app.get('/admin', (req, res) => {
  res.render('admin/home', {
    getParentFolder: '',
  });
})
// end home page

// add product page
app.get('/admin/add-product', (req, res) => {
  db.query(`
    SELECT PkType_Id, TypeName 
    FROM product_type
    `,
    function (err, typeList) {
      if (err) {
        throw err;
      }
      res.render('admin/add-product', {
        typeList: typeList,
        getParentFolder: '../',
      });
    })
})

app.post('/admin/add-product', (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let pathFile = files.productImage.filepath;
    let fileExtension = files.productImage.mimetype.split('/').pop();
    let productType = fields.productType;
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
    let destPath = __dirname + '\\public\\images\\' + fileName;

    fs.copyFile(pathFile, destPath, (err) => {
      if (err) {
        throw err;
      }
      fs.unlink(pathFile, () => {
        console.log('Temp file is deleted ' + pathFile);
      })
      console.log('Uploaded file ' + fileName);
    })

    const product = {
      FkType_Id: productType,
      productName: productName,
      productPrice: productPrice,
      productDescription: productDescription,
      productPublisher: productPublisher,
      productPublishDate: productPublishDate,
      productDimensions: productDimensions,
      productPages: productPages,
      productDisplay: productDisplay,
      productImage: fileName,
    };
    console.log(product);

    db.query('INSERT INTO product SET ?', product, function (err, data) {
      if (err) {
        throw err;
      }
      res.redirect('/');
    })
  })
})
// end add product page

// end </> ADMIN

app.listen(port, function () {
  console.log(`TCM Bookstore project is running at port ${port}`);
})