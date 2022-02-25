const express = require('express');
const router = express.Router();

// category
router.get('/category-overview', function (req, res) {
  res.render('admin/category/category-overview.ejs', {
    pageName: 'Category Overview',
  });
})

router.get('/add-category', function (req, res) {
  res.render('admin/category/add-category.ejs', {
    pageName: 'Add Category',
  });
})

router.get('/update-category/:id', function (req, res) {
  res.render('admin/category/update-category.ejs', {
    pageName: 'Update Category',
  });
})
// end category

// product
router.get('/product-overview', function (req, res) {
  res.render('admin/product/product-overview.ejs', {
    pageName: 'Product Overview',
  });
})

router.get('/add-product', function (req, res) {
  res.render('admin/product/add-product.ejs', {
    pageName: 'Add Product',
  });
})

router.get('/update-product/:id', function (req, res) {
  res.render('admin/product/update-product.ejs', {
    pageName: 'Update Product',
  });
})
// end product
 
// user
router.get('/mail-to-user', function (req, res) {
  res.render('admin/user/mail-to-user.ejs', {
    pageName: 'Mail to User',
  });
})
// end user


module.exports = router;
