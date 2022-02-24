const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const bcrypt = require('bcrypt');

const modelUser = require('../models/m_user.js');
 
// render view
router.get('/register', function (req, res) {
  res.render('user_register');
})

router.get('/login', function (req, res) {
  res.render('user_login', {
    userName: req.query.userName,
    userPassword: req.query.userPassword,
    notification: req.query.notification,
  });
})

router.get('/download', function (req, res) {
  if (req.session.logged === true) {
    res.render('download.ejs', {
      userName: req.session.userName,
    });

  } else {
    req.session.back = '/user/download';
    res.redirect('/user/login');
  };
}) 

router.get('/detail', function (req, res) {
  if (req.session.logged === true) {
    res.render('user_information.ejs', {
      userId: req.session.userId,
    });

  } else {
    res.redirect('/user/login');
  };
})

router.get('/change-password', function (req, res) {
  if (req.session.logged === true) {
    res.render('user_change_password.ejs', {
      userId: req.session.userId,
    });

  } else {
    res.redirect('/user/login');
  };
})

router.get('/forget-password', function (req, res) {
  res.render('forget-password.ejs', {
    notification: req.query.notification,
  });
})

router.get('/change-password-by-email-successfully', function (req, res) {
  res.render('change_password_by_email_successfully.ejs');
})
// end render view

// API
router.post('/', function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let pathFile = files.userImage.filepath;
    let fileExtension = files.userImage.mimetype.split('/').pop();

    let userFullName = fields.userFullName.trim();
    let userName = fields.userName.trim();
    let userPassword = fields.userPassword.trim();
    let userEmail = fields.userEmail.trim();
    let userGenderId = Number(fields.userGender);
    let userAddress = fields.userAddress.trim();
    let userRoleId = Number(fields.userRole);
    let userStatusId = Number(fields.userStatus);

    let date = new Date();
    let slug = userFullName.toLowerCase().replace(/[^A-Za-z0-9\ ]/g, '').replace(/[\ ]+/g, '-');
    let prefix = slug + '_' + date.getTime();
    let fileName = prefix + '.' + fileExtension;
    let destPath = __dirname.replace('\\routes', '') + '\\public\\images\\user\\' + fileName;
    console.log(destPath);

    fs.copyFile(pathFile, destPath, (err) => {
      if (err) {
        throw err;
      };
      fs.unlink(pathFile, () => {
        console.log('Temp file is deleted ' + pathFile);
      });
      console.log('Uploaded file ' + fileName);
    });

    let salt = bcrypt.genSaltSync(10);
    let userPasswordEncoded = bcrypt.hashSync(userPassword, salt);

    const user = {
      UserFullName: userFullName,
      UserName: userName,
      UserPassword: userPasswordEncoded,
      UserEmail: userEmail,
      UserGender: userGenderId,
      UserAddress: userAddress,
      FkUserRole_Id: userRoleId,
      UserStatus: userStatusId,
      UserImage: fileName,
    };
    console.log(user);

    modelUser.add(user, function (data) {
      console.log(data);
      res.json({
        'notification': 'register completed',
      });
    });
  });
})

router.post('/check-login', function (req, res) {
  let userName = req.body.userName;
  let userPassword = req.body.userPassword;

  modelUser.checkLogin(userName, function (data) {
    if (data.length <= 0) {
      let notification = 'User name does not exist';
      res.redirect(
        `/user/login?userName=${userName}&userPassword=${userPassword}&notification=${notification}`
      );

    } else {
      let user = data[0];
      let passwordFromDatabase = user.UserPassword;

      let result = bcrypt.compareSync(userPassword, passwordFromDatabase);
      if (result === true) {
        console.log('Login successfully');

        let session = req.session;
        session.logged = true;
        session.userName = userName;
        session.userId = user.PkUser_Id;

        if (session.back !== undefined) {
          console.log(session.back);
          res.redirect(session.back);

        } else {
          res.redirect('/user/detail');
        };

      } else {
        console.log('Login failed');
        let notification = 'You entered the wrong password';
        res.redirect(
          `/user/login?userName=${userName}&userPassword=${userPassword}&notification=${notification}`
        );
      };
    };
  });
})

router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/user/login');
})

router.get('/:id', function (req, res, next) {
  modelUser.readById(req.params.id, function (data) {
    res.json(data[0]);
  });
})

router.put('/:id', function (req, res, next) {
  // get data from edit router to update into database
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let userFullName = fields.userFullName.trim();
    let userEmail = fields.userEmail.trim();
    let userGenderId = Number(fields.userGender);
    let userAddress = fields.userAddress.trim();
    let userRoleId = Number(fields.userRole);
    let userStatusId = Number(fields.userStatus);

    let checkUpdateImage = files.userImage.size;
    let fileName = fields.oldImageFileName;
    if (checkUpdateImage !== 0) {
      let pathFile = files.userImage.filepath;
      let fileExtension = files.userImage.mimetype.split('/').pop();

      let date = new Date();
      let slug = userFullName.toLowerCase().replace(/[^A-Za-z0-9\ ]/g, '').replace(/[\ ]+/g, '-');
      let prefix = slug + '_' + date.getTime();
      fileName = prefix + '.' + fileExtension;
      let destPath = __dirname.replace('\\routes', '') + '\\public\\images\\user\\' + fileName;
      console.log(destPath);

      fs.copyFile(pathFile, destPath, (err) => {
        if (err) {
          throw err;
        }
        fs.unlink(pathFile, () => {
          console.log('Temp file is deleted ' + pathFile);
        })
        console.log('Uploaded file ' + fileName);

        let oldImageFileName = fields.oldImageFileName;
        let oldImageFileNamePath =
          __dirname.replace('\\routes', '') + '\\public\\images\\user\\' + oldImageFileName;
        fs.unlink(oldImageFileNamePath, () => {
          console.log('Old image file is deleted ' + oldImageFileNamePath);
        })
      })
    }

    const user = {
      UserFullName: userFullName,
      UserEmail: userEmail,
      UserGender: userGenderId,
      UserAddress: userAddress,
      FkUserRole_Id: userRoleId,
      UserStatus: userStatusId,
      UserImage: fileName,
    };
    console.log(user);

    let PkUser_Id = req.params.id;
    modelUser.update(PkUser_Id, user, function (data) {
      console.log(data);
      res.json({
        'notification': 'update user completed',
      });
    })
  })
})

router.get('/update/password', function (req, res) {
  if (req.session.logged === true) {
    let PkUser_Id = req.session.userId;

    let userPassword = req.query.userPassword.trim();
    let salt = bcrypt.genSaltSync(10);
    let userPasswordEncoded = bcrypt.hashSync(userPassword, salt);

    modelUser.update(
      PkUser_Id, {
        UserPassword: userPasswordEncoded,
      },
      function (data) {
        console.log(data);
        res.redirect('/user/logout');
      }
    );

  } else {
    res.json({
      'notification': 'you must be update password at a browser',
    });
  };
})

router.post('/get-new/password', function (req, res) {
  let UserEmail = req.body.userEmail;

  modelUser.getIdByEmail(UserEmail, function (data) {
    if (data.length <= 0) {
      let notification = 'User email does not exist';
      res.redirect(
        `/user/forget-password?notification=${notification}`
      );

    } else {
      let PkUser_Id = data[0].PkUser_Id;

      let userPassword = String(Math.floor(Math.random() * 900000) + 100000);
      let salt = bcrypt.genSaltSync(10);
      let userPasswordEncoded = bcrypt.hashSync(userPassword, salt);

      modelUser.update(
        PkUser_Id, {
          UserPassword: userPasswordEncoded,
        },
        function (data) {
          console.log(data);

          const mailer = require('../utils/mailer.js');
          mailer.sendMail(
            UserEmail,
            'Update new password',
            `Your new password is: ${userPassword}`,
          );

          req.session.destroy();
          res.redirect('/user/change-password-by-email-successfully');
        },
      );
    };
  });
})
// end API

module.exports = router;