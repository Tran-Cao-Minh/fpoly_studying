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

router.get('/register', function (req, res) {
  res.render('user_register.ejs');
})

router.get('/login', function (req, res) {
  res.render('user_login.ejs', {
    userName: req.query.userName,
    userPassword: req.query.userPassword,
    notification: req.query.notification,
  });
})
router.get('/detail', function (req, res) {
  if (req.session.logged === true) {
    res.render('user_information.ejs', {
      userId: req.session.userId,
    });

  } else {
    res.redirect('/user/login');
  };
})

router.get('/change-password', function (req, res) {
  if (req.session.logged === true) {
    res.render('user_change_password.ejs', {
      userId: req.session.userId,
    });

  } else {
    res.redirect('/user/login');
  };
})

router.get('/forget-password', function (req, res) {
  res.render('forget-password.ejs', {
    notification: req.query.notification,
  });
})

router.get('/change-password-by-email-successfully', function (req, res) {
  res.render('change_password_by_email_successfully.ejs');
})
// end user


module.exports = router;
