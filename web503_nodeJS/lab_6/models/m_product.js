const db = require('./database.js');

exports.list = function (callbackFn = Function()) {
  db.query(
    `
    SELECT
      PkProduct_Id,
      ProductImage,
      ProductName,
      ProductPrice
    FROM product
    WHERE 
      FkDisplayStatus_Id = 1
    `,
    function (err, data) {
      if (err) {
        throw err;
      };
      callbackFn(data);
    }
  );
};