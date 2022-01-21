var db = require('./database');
var data = [];

exports.list = function () {
  db.query(
    `
      SELECT 
        PkCategory_Id, CategoryName, CategoryOrder, CategoryDisplay
      FROM product_category
    `,
    function (err, result) {
      if (err) throw err;
      data = result;
    }
  )
  return data;
}