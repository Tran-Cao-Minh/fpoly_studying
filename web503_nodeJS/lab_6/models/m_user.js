const db = require('./database.js');

exports.read = function (callbackFn = Function()) {
  db.query(
    `
      SELECT
        UserFullName,
        UserEmail,
        UserGender,
        UserAddress,
        UserRole,
        UserStatus
      FROM
        user
    `,
    function (err, data) {
      if (err) {
        throw err;
      };
      callbackFn(data);
    }
  );
};

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
        UserEmail,
        UserGender,
        UserAddress,
        UserRole,
        UserStatus,
        UserImage
      FROM
          USER
      WHERE
          PkUser_Id = ${id}
    `,
    id,
    function (err, data) {
      if (err) {
        throw err;
      };
      callbackFn(data);
    }
  )
}