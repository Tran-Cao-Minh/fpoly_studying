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
  database: 'lab_3_node_js'
});

// ex-1
// create db in mysql
// end ex-1

// ex-2
app.get('/', (req, res) => {
  let sql =`SELECT PkType_Id, TypeName 
            FROM product_type 
            WHERE TypeDisplay = 1`;
  db.query(sql, function (err, typeList) {
    if (err) {
      throw err;
    }

    // ex-3
    sql =`SELECT 
            PkProduct_Id, ProductName, ProductImage, ProductPrice 
          FROM product 
          WHERE ProductDisplay = 1`;

    db.query(sql, function (err, productList) {
      if (err) {
        throw err;
      }
      res.render('user/shop', {
        typeList: typeList,
        productList: productList,
        getFolderParent: '',
      });
    })
    // end ex-3
  })
})
// end ex-2

// ex-4
app.get('/type/:typeId', (req, res) => {
  let FkType_Id = req.params.typeId;

  let sql =`SELECT PkType_Id, TypeName 
            FROM product_type 
            WHERE TypeDisplay = 1`;
  db.query(sql, function (err, typeList) {
    if (err) {
      throw err;
    }

    sql =`SELECT 
            PkProduct_Id, ProductName, ProductImage, ProductPrice 
          FROM product 
          WHERE FkType_Id = ${FkType_Id}`;

    db.query(sql, function (err, productList) {
      if (err) {
        throw err;
      }
      res.render('user/shop', {
        typeList: typeList,
        productList: productList,
        getFolderParent: '../',
      });
    })
  })
})
// end ex-4

// ex-5
app.get('/admin', (req, res) => {
  res.render('admin/home');
})

app.get('/admin/add-product', (req, res) => {
  let sql =`SELECT PkType_Id, TypeName 
            FROM product_type`;
  db.query(sql, function (err, typeList) {
    if (err) {
      throw err;
    }
    res.render('admin/add-product', {typeList: typeList});
  })
})

app.post('/admin/add-product', (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let pathFile = files.productImage.filepath;
    let fileExtension = files.productImage.mimetype.split('/').pop();
    let productType = fields.productType;
    let productName = fields.productName;
    let productPrice = fields.productPrice;
    let productDescription = fields.productDescription;
    let productDisplay = fields.productDisplay;

    let date = new Date();
    let slug = productName.toLowerCase().trim().replace(/[^A-Za-z0-9\ ]/g, '').replace(/[\ ]+/g, '-');
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
      productDisplay: productDisplay,
      productImage: fileName,
    };
    console.log(product);

    db.query('INSERT INTO product SET ?', product, function(err, data) {
      if (err) {
        throw err;
      }
      res.redirect('/');
    })
  })
})
// end ex-5

app.listen(port, () => {
  console.log(`project is running at port ${port}`);
})