var db = require('./database');

exports.searchByValue = function (
  filter = {
    columnList: Array(String()),
    searchValue: String(),
    searchColumn: String(),
    orderRule: String(),
    orderColumn: String(),
    resultQuantity: Number(),
    pageNum: Number(),
  },
  callbackFn = Function(data = Object()),
) {
  filter.columnList = filter.columnList.join(', ');
  let offset = filter.resultQuantity * (filter.pageNum - 1);
  let rowCount = filter.resultQuantity;

  let sql = `
    SELECT ${filter.columnList}
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
        p.FkProductCategory_Id = pc.PkProductCategory_Id
      GROUP BY
        PkProductCategory_Id
    ) AS category
  `;

  if (filter.searchValue === '') {
    sql += `WHERE ${filter.searchColumn} LIKE '%%' `;

  } else {
    let searchValueList = filter.searchValue.trim().split(/\s+/);
    let searchSql = 'WHERE ';
    searchValueList.forEach(searchValue => {
      searchSql += `LOWER(${filter.searchColumn}) LIKE LOWER('%${searchValue}%') AND `;
    });
  
    sql += searchSql.slice(0, -4);
  }
  
  sql += `
    ORDER BY
      ${filter.orderColumn} ${filter.orderRule}
    LIMIT 
      ${offset}, ${rowCount}
  `;
  console.log(sql);

  db.query(sql,
    function (err, data) {
      if (err) {
        throw err;
      };
      callbackFn(data);
    }
  );
};