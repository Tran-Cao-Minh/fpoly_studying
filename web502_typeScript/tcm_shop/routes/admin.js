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
  res.render('admin/admin-login.ejs');
})
// end login

// category
router.get('/category-overview', (req, res) => {
  checkAdmin(
    req, res,
    'admin/category/overview.ejs',
    'Category Overview'
  );
})

router.get('/add-category', (req, res) => {
  checkAdmin(
    req, res,
    'admin/category/add.ejs',
    'Add Category'
  );
})

router.get('/update-category/:id', (req, res) => {
  checkAdmin(
    req, res,
    'admin/category/update.ejs',
    'Update Category'
  );
})
// end category

// product
router.get('/product-overview', (req, res) => {
  checkAdmin(
    req, res,
    'admin/product/overview.ejs',
    'Product Overview'
  );
})

router.get('/add-product', (req, res) => {
  checkAdmin(
    req, res,
    'admin/product/add.ejs',
    'Add Product'
  );
})

router.get('/update-product/:id', (req, res) => {
  checkAdmin(
    req, res,
    'admin/product/update.ejs',
    'Update Product'
  );
})
// end product

// order
router.get('/order-overview', (req, res) => {
  checkAdmin(
    req, res,
    'admin/order/overview.ejs',
    'Order Overview'
  );
})

router.get('/order-statistics', (req, res) => {
  checkAdmin(
    req, res,
    'admin/order/statistics.ejs',
    'Order Statistics'
  );
})

router.get('/update-order/:id', (req, res) => {
  checkAdmin(
    req, res,
    'admin/order/update.ejs',
    'Update Order'
  );
})
// end order
 
// user
// router.get('/mail-to-user', (req, res) => {
//   checkAdmin(
//     req, res,
//     'admin/user/mail-to-user.ejs',
//     'Mail to User'
//   );
// })
// end user


module.exports = router;
