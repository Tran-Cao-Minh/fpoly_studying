var db = require('./database');

exports.search = function (
  filter = {
    columnList: Array(String()),
    searchValue: String(),
    searchMinValue: String(),
    searchMaxValue: String(),
    searchMode: 'searchByValue' || 'searchByMinMax',
    searchColumn: String(),
    orderRule: String(),
    orderColumn: String(),
    resultQuantity: Number(),
    pageNum: Number(),
  },
  callbackFn = Function(data = Array(Object()), total = Number()),
) {
  filter.columnList = filter.columnList.join(', ');
  let offset = filter.resultQuantity * (filter.pageNum - 1);
  let rowCount = filter.resultQuantity;

  let dataSql = `SELECT ${filter.columnList} `;
  let countSql = `SELECT COUNT(*) AS total `;

  let dataTable = `
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

  let baseSql = dataTable;

  switch (filter.searchMode) {
    case 'searchByValue':
      if (filter.searchValue === '') {
        baseSql += `WHERE ${filter.searchColumn} LIKE '%%' `;

      } else {
        let searchValueList = filter.searchValue.trim().split(/\s+/);
        let searchSql = 'WHERE ';
        searchValueList.forEach(searchValue => {
          searchSql += `LOWER(${filter.searchColumn}) LIKE LOWER('%${searchValue}%') OR `;
        });

        baseSql += searchSql.slice(0, -4);
      }
      break;

    case 'searchByMinMax':
      if (
        filter.searchMinValue !== '' &&
        filter.searchMaxValue !== ''
      ) {
        baseSql += `WHERE ${filter.searchColumn} 
                BETWEEN '${filter.searchMinValue}' AND '${filter.searchMaxValue}' `;
      } else if (
        filter.searchMinValue !== '' &&
        filter.searchMaxValue === ''
      ) {
        baseSql += `WHERE ${filter.searchColumn} >= '${filter.searchMinValue}' `;

      } else if (
        filter.searchMinValue === '' &&
        filter.searchMaxValue !== ''
      ) {
        baseSql += `WHERE ${filter.searchColumn} <= '${filter.searchMaxValue}' `;
      }
      break;
  }

  dataSql += baseSql;
  dataSql += `
    ORDER BY
      ${filter.orderColumn} ${filter.orderRule}
    LIMIT 
      ${offset}, ${rowCount}
  `;

  countSql += baseSql;

  // console.log(dataSql);
  // console.log(countSql);

  db.query(dataSql,
    function (err, data) {
      if (err) {
        throw err;
      };
      db.query(countSql,
        function (err, total) {
          if (err) {
            throw err;
          };
          callbackFn(data, total[0].total);
        }
      );
    }
  );
};

// exports.searchByMinMax = function (
//   filter = {
//     columnList: Array(String()),
//     searchMinValue: String(),
//     searchMaxValue: String(),
//     searchColumn: String(),
//     orderRule: String(),
//     orderColumn: String(),
//     resultQuantity: Number(),
//     pageNum: Number(),
//   },
//   callbackFn = Function(data = Object()),
// ) {
//   filter.columnList = filter.columnList.join(', ');
//   let offset = filter.resultQuantity * (filter.pageNum - 1);
//   let rowCount = filter.resultQuantity;

//   let sql = `
//     SELECT ${filter.columnList}
//     FROM (
//       SELECT
//           PkProductCategory_Id AS CategoryId,
//           CategoryName,
//           CategoryOrder,
//           StatusName AS CategoryDisplay,
//           COUNT(*) AS CategoryProductQuantity
//       FROM
//           product_category pc
//       INNER JOIN 
//         display_status ds ON
//         pc.FkDisplayStatus_Id = ds.PkDisplayStatus_Id
//       INNER JOIN 
//         product p ON
//         p.FkProductCategory_Id = pc.PkProductCategory_Id
//       GROUP BY
//         PkProductCategory_Id
//     ) AS category
//   `;

//   if (
//     filter.searchMinValue !== '' &&
//     filter.searchMaxValue !== ''
//   ) {
//     sql += `WHERE ${filter.searchColumn} 
//             BETWEEN '${filter.searchMinValue}' AND '${filter.searchMaxValue}' `;
//   } else if (
//     filter.searchMinValue !== '' &&
//     filter.searchMaxValue === ''
//   ) {
//     sql += `WHERE ${filter.searchColumn} >= '${filter.searchMinValue}' `;

//   } else if (
//     filter.searchMinValue === '' &&
//     filter.searchMaxValue !== ''
//   ) {
//     sql += `WHERE ${filter.searchColumn} <= '${filter.searchMaxValue}' `;
//   }

//   sql += `
//     ORDER BY
//       ${filter.orderColumn} ${filter.orderRule}
//     LIMIT 
//       ${offset}, ${rowCount}
//   `;
//   console.log(sql);

//   db.query(sql,
//     function (err, data) {
//       if (err) {
//         throw err;
//       };
//       callbackFn(data);
//     }
//   );
// };

exports.add = function (
  data = Object(),
  callbackFn = Function(),
) {
  db.query(
    `
      INSERT INTO product_category SET ?
    `,
    data,
    function (err, data) {
      if (err) {
        throw err;
      };
      callbackFn(data);
    }
  );
}

exports.findOne = function (
  columnKey = String(),
  value = String(),
  callbackFn = Function(),
) {
  db.query(
    `
      SELECT
        PkProductCategory_Id
      FROM
        product_category
      WHERE
        ${columnKey} = '${value}'
      LIMIT 1
    `,
    function (err, data) {
      if (err) {
        throw err;
      };
      if (data.length <= 0) {
        callbackFn(false);

      } else {
        callbackFn(true);
      };
    }
  );
}

exports.checkFkDisplayStatus = function (
  value = Number(),
  callbackFn = Function(),
) {
  db.query(
    `
      SELECT
        PkDisplayStatus_Id
      FROM
        display_status
      WHERE
        PkDisplayStatus_Id = ${value}
      LIMIT 1
    `,
    function (err, data) {
      if (err) {
        throw err;
      };
      if (data.length <= 0) {
        callbackFn(false);

      } else {
        callbackFn(true);
      };
    }
  );
}