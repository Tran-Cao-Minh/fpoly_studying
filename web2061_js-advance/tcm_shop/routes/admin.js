const express = require('express');
const router = express.Router();

// category
router.get('/category-overview', function (req, res) {
  res.render('admin/category/category-overview.ejs');
})
// end category

module.exports = router;
