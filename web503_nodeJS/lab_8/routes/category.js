const express = require('express');
const router = express.Router();

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const url = "mongodb://0.0.0.0:27017/";



// get category list
router.get('/', function (req, res) {
  mongoClient.connect(url, function (err, client) {
    let db = client.db('news');

    db.collection('news_category')
      .find({}).toArray(function (err, data) {
        console.log(data);

        res.render('category-list.ejs', {
          categoryList: data,
        });

        console.log('get category completed');
        client.close();
      });
  });
})

// add category form
router.get('/add', function (req, res) {
  res.render('category-add');
})

// insert category
router.post('/', function (req, res) {
  console.log(req.body);
  let category = {
    "CategoryName": req.body.categoryName,
    "CategoryOrder": Number(req.body.categoryOrder),
    "CategoryDisplay": Boolean(req.body.categoryDisplay),
  };

  mongoClient.connect(url, function (err, client) {
    let db = client.db('news');

    db.collection('news_category')
      .insertOne(category, function (err, data) {
        console.log(data);
        console.log('Insert category completed');

        res.redirect('/category');
        client.close();
      });
  });
})

// edit category form
router.get('/edit/:id', function (req, res) {
  res.render('category-edit');
})

module.exports = router;