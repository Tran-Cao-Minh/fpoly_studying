const express = require('express');
const router = express.Router();

router.get('/shop', function (req, res) {
  res.render('client/shop.ejs', {
    pageLinkList: [
      {
        name: 'Shop',
        link: null,
      },
    ]
  });
})

router.get('/shop/product-detail/:id', function (req, res) {
  res.render('client/product-detail.ejs', {
    pageLinkList: [
      {
        name: 'Shop',
        link: '../../shop',
      },
      {
        name: 'Product detail',
        link: null,
      },
    ]
  });
})

// user
router.get('/register', function (req, res) {
  res.render('client/user/user_register.ejs');
})

router.get('/login', function (req, res) {
  res.render('client/user/user_login.ejs', {
    userName: req.query.userName,
    userPassword: req.query.userPassword,
    notification: req.query.notification,
    pageLinkList: [
      {
        name: 'Account',
        link: null,
      },
      {
        name: 'Login',
        link: null,
      },
    ]
  });
})
router.get('/account-detail', function (req, res) {
  if (req.session.logged === true) {
    res.render('client/user/user_information.ejs', {
      userId: req.session.userId,
      pageLinkList: [
        {
          name: 'Account',
          link: null,
        },
        {
          name: 'Detail',
          link: null,
        },
      ]
    });

  } else {
    res.redirect('/login');
  };
})

router.get('/change-password', function (req, res) {
  if (req.session.logged === true) {
    res.render('client/user/user_change_password.ejs', {
      userId: req.session.userId,
      pageLinkList: [
        {
          name: 'Account',
          link: null,
        },
        {
          name: 'Change password',
          link: null,
        },
      ]
    });

  } else {
    res.redirect('/login');
  };
})

router.get('/forget-password', function (req, res) {
  res.render('client/user/forget-password.ejs', {
    notification: req.query.notification,
    pageLinkList: [
      {
        name: 'Account',
        link: null,
      },
      {
        name: 'Forget password',
        link: null,
      },
    ]
  });
})

router.get('/change-password-by-email-successfully', function (req, res) {
  res.render('client/user/change_password_by_email_successfully.ejs', {
    pageLinkList: [
      {
        name: 'Account',
        link: null,
      },
      {
        name: 'Change password successfully',
        link: null,
      },
    ]
  });
})
// end user


module.exports = router;
