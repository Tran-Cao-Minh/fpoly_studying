const express = require('express');
const router = express.Router();

const modelProduct = require('../models/m_product.js');

router.get('/list', function (req, res, next) {
  res.render('product_list');
})

router.get('/', function (req, res, next) {
  modelProduct.list(function(data) {
    res.json(data);
  });
})

module.exports = router;