const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const bcrypt = require('bcrypt');

const modelUser = require('../models/m_user.js');

router.get('/overview', function (req, res, next) {
  res.render('user_overview');
})

router.get('/', function (req, res, next) {
  modelUser.read(function(data) {
    res.json(data);
  });
})

router.get('/add', function (req, res, next) {
  res.render('user_add');
})

router.post('/', function (req, res, next) {
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
      FkUserGender_Id: userGenderId,
      UserAddress: userAddress,
      FkUserRole_Id: userRoleId,
      FkUserStatus_Id: userStatusId,
      UserImage: fileName,
    };
    console.log(user);

    modelUser.add(user, function(data) {
      console.log(data);
      res.json({
        'notification': 'add user completed',
      });
    });
  });
})

router.get('/:id', function (req, res, next) {
  modelUser.readById(req.params.id, function(data) {
    res.json(data[0]);
  });
})

router.get('/update/:id', function (req, res, next) {
  res.render('user_update');
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
      FkUserGender_Id: userGenderId,
      UserAddress: userAddress,
      FkUserRole_Id: userRoleId,
      FkUserStatus_Id: userStatusId,
      UserImage: fileName,
    };
    console.log(user);

    let PkUser_Id = req.params.id;
    modelUser.update(PkUser_Id, user, function(data) {
      console.log(data);
      res.json({
        'notification': 'update user completed',
      });
    })
  })
})

router.delete('/:id', function (req, res) {
  let id = req.params.id;

  modelUser.delete(id, function(data) {
    if (data.affectedRows === 0) {
      console.log(`Do not have user with ID ${PkUser_Id} to delete`);
    };
    res.json({
      'notification': 'delete user completed',
    });
  });
})

module.exports = router;