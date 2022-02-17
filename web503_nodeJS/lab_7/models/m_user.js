const db = require('./database.js');

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
        UserGender,
        UserAddress,
        FkUserRole_Id,
        UserStatus,
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

exports.checkLogin = function (
  userName = String(),
  callbackFn = Function(data = Object()),
) {
  db.query(
    `
      SELECT 
        PkUser_Id,
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

exports.getIdByEmail = function (
  userEmail = String(),
  callbackFn = Function(data = Object()),
) {
  db.query(
    `
      SELECT 
        PkUser_Id
      FROM 
        user
      WHERE 
        UserEmail = '${userEmail}'
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
