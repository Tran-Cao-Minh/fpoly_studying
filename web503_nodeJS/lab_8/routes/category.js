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
  let category = {
    CategoryName: req.body.categoryName,
    CategoryOrder: Number(req.body.categoryOrder),
    CategoryDisplay: Boolean(Number(req.body.categoryDisplay)),
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
  let id = req.params.id;

  mongoClient.connect(url, function (err, client) {
    let db = client.db('news');

    let query = {
      _id: mongodb.ObjectId(id)
    };
    db.collection('news_category')
      .findOne(query, function (err, data) {
        console.log(data);
        res.render('category-edit', {
          category: data,
        });

        client.close();
      });
  });
})

// update category 
router.put('/:id', function (req, res) {
  let id = req.params.id;

  mongoClient.connect(url, function (err, client) {
    let db = client.db('news');

    let query = {
      _id: mongodb.ObjectId(id)
    };

    let categoryValueSet = {
      $set: {
        CategoryName: req.body.categoryName,
        CategoryOrder: Number(req.body.categoryOrder),
        CategoryDisplay: Boolean(Number(req.body.categoryDisplay)),
      }
    };

    db.collection('news_category')
      .updateOne(query, categoryValueSet, function (err, data) {
        console.log(data);
        res.json(data);

        client.close();
      });
  });
})

// delete category
router.delete('/:id', function (req, res) {
  let id = req.params.id;

  mongoClient.connect(url, function (err, client) {
    let db = client.db('news');

    let deleteCategoryChildQuery = {
      NewsCategoryId: id
    };

    db.collection('news_list')
      .deleteMany(deleteCategoryChildQuery, function (err, data) {
        console.log(data);
        console.log('Delete news items child completed ~');
      });

    let query = {
      _id: mongodb.ObjectId(id)
    };

    db.collection('news_category')
      .deleteOne(query, function (err, data) {
        console.log(data);
        console.log('Delete data completed ~');
        res.json(data);

        client.close();
      });
  });
})

module.exports = router;