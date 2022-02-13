const db = require('./database.js');
const fs = require('fs');

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

exports.delete = function (
  id = Number(),
  callbackFn = Function(),
) {
  db.query(
    `
      SELECT UserImage
      FROM user 
      WHERE PkUser_Id = ${id}
      LIMIT 1
    `,
    function (err, data) {
      let imageFileNamePath =
        __dirname.replace('\\models', '') + '\\public\\images\\user\\' + data[0].UserImage;
      fs.unlink(imageFileNamePath, () => {
        console.log('User image file is deleted ' + imageFileNamePath);
      });

      db.query(
        `
          DELETE FROM user
          WHERE PkUser_Id = ${id}
          LIMIT 1
        `,
        function (err, data) {
          callbackFn(data);
        }
      );
    }
  );
}