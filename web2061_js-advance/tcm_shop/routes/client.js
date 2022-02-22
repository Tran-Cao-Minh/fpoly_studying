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



module.exports = router;
