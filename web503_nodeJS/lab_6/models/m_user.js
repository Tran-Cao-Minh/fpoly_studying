const db = require('./database.js');

exports.read = function (callbackFn = Function()) {
  db.query(
    `
      SELECT
        PkUser_Id,
        UserFullName,
        UserEmail,
        GenderName,
        RoleName,
        StatusName,
        UserImage
      FROM
          user AS u
      INNER JOIN user_gender AS ug ON
        u.FkUserGender_Id = ug.PkUserGender_Id
      INNER JOIN user_role AS ur ON
        u.FkUserRole_Id = ur.PkUserRole_Id
      INNER JOIN user_status AS us ON
        u.FkUserStatus_Id = us.PkUserStatus_Id
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