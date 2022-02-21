var db = require('./database');

exports.getTags = function (
  callbackFn = Function(data = Object()),
) {
  db.query(
    `
      SELECT
        PkProductTag_Id,
        TagName
      FROM
        product_tag pt
      INNER JOIN product p ON
        pt.PkProductTag_Id = p.FkProductTag_Id
      GROUP BY
        PkProductTag_Id
    `,
    function (err, data) {
      if (err) {
        throw err;
      };
      callbackFn(data);
    }
  );
}

exports.getProductList = function (
  filter = {
    tagList: [String()],
    categoryList: [String()],
    orderBy: String(),
    orderRule: String(),
  },
  callbackFn = Function(data = Object()),
) {
  let sql = `
    SELECT
      PkProduct_Id,
      ProductName,
      ProductImage,
      ProductPrice,
      ProductSalePercent,
      TagImage
    FROM
      product p
    INNER JOIN product_tag pt ON
      p.FkProductTag_Id = pt.PkProductTag_Id
    WHERE
      ProductDisplay = 1
  `;

  if (filter.tagList !== undefined) {
    if (filter.tagList.length > 0 && typeof(filter.tagList) === 'object') {
      sql += 'AND FkProductTag_Id IN (';
      let tagList = '';
      filter.tagList.forEach(tag => {
        tagList += `'${tag}', `;
      });
      sql = sql + tagList.slice(0, -2) + ') ';
    };
  };

  if (filter.categoryList !== undefined) {
    if (filter.categoryList.length > 0 && typeof(filter.categoryList) === 'object') {
      sql += 'AND FkProductCategory_Id IN (';
      let categoryList = '';
      filter.categoryList.forEach(category => {
        categoryList += `'${category}', `;
      });
      sql = sql + categoryList.slice(0, -2) + ') ';
    };
  };

  sql += `
    ORDER BY
      ${filter.orderBy} ${filter.orderRule}
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
}

exports.getShopProductById = function (
  id = Number,
  callbackFn = Function(data = Object()),
) {
  db.query(
    `
      SELECT
        PkProduct_Id,
        ProductName,
        ProductDescription,
        ProductImage,
        ProductPrice,
        CategoryName,
        ProductPublisher,
        ProductPublishDate,
        ProductDimensions,
        ProductPages,
        ProductViews,
        ProductSalePercent,
        TagImage,
        ProductQuantity
      FROM
        product p
      INNER JOIN product_tag pt ON
        p.FkProductTag_Id = pt.PkProductTag_Id
      INNER JOIN product_category pc ON
        p.FkProductCategory_Id = pc.PkProductCategory_Id
      WHERE
        PkProduct_Id = ${id}
      LIMIT 1
    `,
    function (err, data) {
      if (err) {
        throw err;
      };
      callbackFn(data);
    }
  );
}

// exports.search = function (
//   filter = {
//     columnList: Array(String()),
//     searchValue: String(),
//     searchMinValue: String(),
//     searchMaxValue: String(),
//     searchMode: 'searchByValue' || 'searchByMinMax',
//     searchColumn: String(),
//     orderRule: String(),
//     orderColumn: String(),
//     resultQuantity: Number(),
//     pageNum: Number(),
//   },
//   callbackFn = Function(data = Array(Object()), total = Number()),
// ) {
//   filter.columnList = filter.columnList.join(', ');
//   let offset = filter.resultQuantity * (filter.pageNum - 1);
//   let rowCount = filter.resultQuantity;

//   let dataSql = `SELECT ${filter.columnList} `;
//   let countSql = `SELECT COUNT(*) AS total `;

//   let dataTable = `
//     FROM (
//       SELECT
//         PkProductCategory_Id AS CategoryId,
//         CategoryName,
//         CategoryOrder,
//         StatusName AS CategoryDisplay,
//         COUNT(PkProduct_Id) AS CategoryProductQuantity
//       FROM
//         product_category pc
//       INNER JOIN display_status ds ON
//         pc.FkDisplayStatus_Id = ds.PkDisplayStatus_Id
//       LEFT JOIN product p ON
//         p.FkProductCategory_Id = pc.PkProductCategory_Id
//       GROUP BY
//         PkProductCategory_Id
//     ) AS category
//   `;

//   let baseSql = dataTable;

//   switch (filter.searchMode) {
//     case 'searchByValue':
//       if (filter.searchValue === '') {
//         baseSql += `WHERE ${filter.searchColumn} LIKE '%%' `;

//       } else {
//         let searchValueList = filter.searchValue.trim().split(/\s+/);
//         let searchSql = 'WHERE ';
//         searchValueList.forEach(searchValue => {
//           searchSql += `LOWER(${filter.searchColumn}) LIKE LOWER('%${searchValue}%') OR `;
//         });

//         baseSql += searchSql.slice(0, -4);
//       }
//       break;

//     case 'searchByMinMax':
//       if (
//         filter.searchMinValue !== '' &&
//         filter.searchMaxValue !== ''
//       ) {
//         baseSql += `WHERE ${filter.searchColumn} 
//                 BETWEEN '${filter.searchMinValue}' AND '${filter.searchMaxValue}' `;
//       } else if (
//         filter.searchMinValue !== '' &&
//         filter.searchMaxValue === ''
//       ) {
//         baseSql += `WHERE ${filter.searchColumn} >= '${filter.searchMinValue}' `;

//       } else if (
//         filter.searchMinValue === '' &&
//         filter.searchMaxValue !== ''
//       ) {
//         baseSql += `WHERE ${filter.searchColumn} <= '${filter.searchMaxValue}' `;
//       }
//       break;
//   }

//   dataSql += baseSql;
//   dataSql += `
//     ORDER BY
//       ${filter.orderColumn} ${filter.orderRule}
//     LIMIT 
//       ${offset}, ${rowCount}
//   `;

//   countSql += baseSql;

//   // console.log(dataSql);
//   // console.log(countSql);

//   db.query(dataSql,
//     function (err, data) {
//       if (err) {
//         throw err;
//       };
//       db.query(countSql,
//         function (err, total) {
//           if (err) {
//             throw err;
//           };
//           callbackFn(data, total[0].total);
//         }
//       );
//     }
//   );
// };

// exports.add = function (
//   data = Object(),
//   callbackFn = Function(),
// ) {
//   db.query(
//     `
//       INSERT INTO product_category SET ?
//     `,
//     data,
//     function (err, data) {
//       if (err) {
//         throw err;
//       };
//       callbackFn(data);
//     }
//   );
// }

// exports.update = function (
//   id = String(),
//   data = Object(),
//   callbackFn = Function(),
// ) {
//   db.query(
//     `
//       UPDATE product_category SET ?
//       WHERE
//         PkProductCategory_Id = '${id}'
//     `,
//     data,
//     function (err, data) {
//       if (err) {
//         throw err;
//       };
//       callbackFn(data);
//     }
//   );
// }

// exports.findOne = function (
//   columnKey = String(),
//   value = String(),
//   callbackFn = Function(),
// ) {
//   db.query(
//     `
//       SELECT
//         PkProductCategory_Id
//       FROM
//         product_category
//       WHERE
//         ${columnKey} = '${value}'
//       LIMIT 1
//     `,
//     function (err, data) {
//       if (err) {
//         throw err;
//       };
//       callbackFn(data);
//     }
//   );
// }

// exports.checkFkDisplayStatus = function (
//   value = Number(),
//   callbackFn = Function(),
// ) {
//   db.query(
//     `
//       SELECT
//         PkDisplayStatus_Id
//       FROM
//         display_status
//       WHERE
//         PkDisplayStatus_Id = ${value}
//       LIMIT 1
//     `,
//     function (err, data) {
//       if (err) {
//         throw err;
//       };
//       if (data.length <= 0) {
//         callbackFn(false);

//       } else {
//         callbackFn(true);
//       };
//     }
//   );
// }

// exports.delete = function (
//   id = String(),
//   callbackFn = Function(),
// ) {
//   db.query(
//     `
//       SELECT
//         COUNT(*) AS CategoryProductQuantity,
//         CategoryName
//       FROM
//         product_category pc
//       RIGHT JOIN product p ON
//         pc.PkProductCategory_Id = p.FkProductCategory_Id
//       WHERE
//         PkProductCategory_Id = '${id}'
//     `,
//     function (err, data) {
//       if (err) {
//         throw err;
//       };

//       let category = data[0];
//       if (category.CategoryProductQuantity === 0) {
//         db.query(
//           `
//             DELETE FROM 
//               product_category
//             WHERE 
//               PkProductCategory_Id = '${id}'
//           `,
//           function (err, data) {
//             if (err) {
//               throw err;
//             };

//             if (data.affectedRows === 0) {
//               callbackFn({
//                 result: 'warning',
//                 notification: 
//                   `Do not have Category with ID ${id} to delete`,
//               });
//             } else {
//               callbackFn({
//                 result: 'success',
//                 notification: 
//                   `Delete Category - ${category.CategoryName} successfully`,
//               });
//             };
//           },
//         );
//       } else {
//         callbackFn({
//           result: 'fail',
//           notification: 
//             `The number of products in Category - ${category.CategoryName} must be 0 to be deleted`,
//         });
//       };
//     },
//   );
// }