var db = require('./database');
var data = [];

exports.searchByValue = function (
  columnList,
  searchValue,
  searchColumn,
  orderRule,
  orderColumn,
  resultQuantity,
  pageNum,
) {
  columnList = columnList.join(', ');
  let offset = resultQuantity * (pageNum - 1);
  let rowCount = resultQuantity;

  let sql = `
    SELECT ${columnList}
    FROM (
      SELECT
          PkProductCategory_Id AS CategoryId,
          CategoryName,
          CategoryOrder,
          StatusName AS CategoryDisplay,
          COUNT(*) AS CategoryProductQuantity
      FROM
          product_category pc
      INNER JOIN 
        display_status ds ON
        pc.FkDisplayStatus_Id = ds.PkDisplayStatus_Id
      INNER JOIN 
        product p ON
        p.FkCategory_Id = pc.PkProductCategory_Id
      WHERE 
        ${searchColumn} LIKE '%${searchValue}%'
      GROUP BY
        PkProductCategory_Id
      ORDER BY
        ${orderColumn} ${orderRule}
      LIMIT 
        ${offset}, ${rowCount}
    ) AS category
  `;

  db.query(sql,
    function (err, result) {
      if (err) throw err;
      data = result;
    }
  )
  return data;
}