var db = require('./database');
var data = [];

exports.list = function (
  columnList,
  searchValue,
  searchColumn,
  orderRule,
  orderColumn,
  offset,
  rowCount,
) {
  columnList = columnList.join(', ');
  db.query(
    `
      SELECT ${columnList}
      FROM product_category
      WHERE ${searchColumn} LIKE '%${searchValue}%'
      ORDER BY ${orderColumn} ${orderRule}
      LIMIT ${offset}, ${rowCount}
    `,
    function (err, result) {
      if (err) throw err;
      data = result;
    }
  )
  return data;
}