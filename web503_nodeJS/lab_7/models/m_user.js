const db = require('./database.js');
const fs = require('fs');

exports.add = function (
  data = Object(),
  callbackFn = Function(),
) {
  db.query(
    `
      INSERT INTO user SET ?
    `,
    data,
    function (err, data) {
      if (err) {
        throw err;
      };
      callbackFn(data);
    }
  );
};

exports.update = function (
  id = Number(),
  data = Object(),
  callbackFn = Function(),
) {
  db.query(
    `
      UPDATE user SET ?
      WHERE PkUser_Id = ?
    `,
    [data, id],
    function (err, data) {
      if (err) {
        throw err;
      };
      callbackFn(data);
    }
  );
};

exports.readById = function (
  id = Number(),
  callbackFn = Function(),
) {
  db.query(
    `
      SELECT
        PkUser_Id,
        UserFullName,
        UserName,
        UserPassword,
        UserEmail,
        FkUserGender_Id,
        UserAddress,
        FkUserRole_Id,
        FkUserStatus_Id,
        UserImage
      FROM
          user
      WHERE
          PkUser_Id = ${id}
      LIMIT 1
    `,
    id,
    function (err, data) {
      if (err) {
        throw err;
      };
      callbackFn(data);
    }
  );
}

exports.getUserPassword = function (
  userName = String(),
  callbackFn = Function(data = Object()),
) {
  db.query(
    `
      SELECT 
        UserPassword
      FROM 
        user
      WHERE 
        UserName = '${userName}'
      LIMIT 
        1
    `,
    function (err, data) {
      if (err) {
        throw err;
      };
      callbackFn(data);
    }
  );
}
