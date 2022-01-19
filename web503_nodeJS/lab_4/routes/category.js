const express = require('express');
const router = express.Router();
const db = require('../models/database');

router.get('/', function(req, res, next) {
  let sql = ### 
  Chức năng hiện danh sách record
  res.send('Book category list');
})

router.get('/add', function(req, res, next) {
  res.send('Adding book category Form');
})

router.post('/store', function(req, res, next) {
  // get data form add router to add record into database
})

router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id;
  res.send('Edit book category Form ' + id);
})

router.post('/update', function(req, res, next) {
  // get data from edit router to update into database
})

router.get('/delete/:id', function(req, res) {
  let id = req.params.id;
  res.send('Delete book category');
})

module.exports = router;