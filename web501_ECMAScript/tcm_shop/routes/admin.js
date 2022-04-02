const express = require('express');
const router = express.Router();

const checkAdmin = (
  req = new Request(),
  res = new Response(),
  viewName = String(),
  pageName = String()
) => {
  res.render(viewName, {
    pageName: pageName,
  });

  // if (req.session.logged === true) {
  //   res.render(viewName, {
  //     pageName: pageName,
  //   });

  // } else {
  //   res.redirect('/admin/login');
  // };
};

// login
router.get('/login', (req, res) => {
  res.render('admin/admin-login.ejs', {
    userName: req.query.userName,
    userPassword: req.query.userPassword,
    notification: req.query.notification
  });
})
// end login

// category
router.get('/category-overview', (req, res) => {
  checkAdmin(
    req, res,
    'admin/category/category-overview.ejs',
    'Category Overview'
  );
})

router.get('/add-category', (req, res) => {
  checkAdmin(
    req, res,
    'admin/category/add-category.ejs',
    'Add Category'
  );
})

router.get('/update-category/:id', (req, res) => {
  checkAdmin(
    req, res,
    'admin/category/update-category.ejs',
    'Update Category'
  );
})
// end category

// product
router.get('/product-overview', (req, res) => {
  checkAdmin(
    req, res,
    'admin/product/product-overview.ejs',
    'Product Overview'
  );
})

router.get('/add-product', (req, res) => {
  checkAdmin(
    req, res,
    'admin/product/add-product.ejs',
    'Add Product'
  );
})

router.get('/update-product/:id', (req, res) => {
  checkAdmin(
    req, res,
    'admin/product/update-product.ejs',
    'Update Product'
  );
})
// end product
 
// user
router.get('/mail-to-user', (req, res) => {
  checkAdmin(
    req, res,
    'admin/user/mail-to-user.ejs',
    'Mail to User'
  );
})
// end user


module.exports = router;
