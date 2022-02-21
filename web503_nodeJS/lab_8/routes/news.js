const express = require('express');
const router = express.Router();

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const url = "mongodb://0.0.0.0:27017/";

// get news list
router.get('/', function (req, res) {
  mongoClient.connect(url, function (err, client) {
    let db = client.db('news');

    db.collection('news_list')
      .find({}).toArray(function (err, newsList) {
        console.log(newsList);

        db.collection('news_category')
          .find({}, {
            projection: {
              CategoryName: 1
            }
          })
          .toArray(function (err, categoryList) {
            res.render('news-list.ejs', {
              newsList: newsList,
              categoryList: categoryList,
            });

            console.log('get news completed');
            client.close();
          });
      });
  });
})

// add news form
router.get('/add', function (req, res) {
  mongoClient.connect(url, function (err, client) {
    let db = client.db('news');

    db.collection('news_category')
      .find({}, {
        projection: {
          CategoryName: 1
        }
      }).toArray(function (err, data) {
        console.log(data);

        res.render('news-add.ejs', {
          categoryList: data,
        });

        client.close();
      });
  });
})

// insert news
router.post('/', function (req, res) {
  let news = {
    NewsName: req.body.newsName,
    NewsCategoryId: req.body.newsCategoryId,
    NewsContent: req.body.newsContent,
    NewsOrder: Number(req.body.newsOrder),
    NewsDisplay: Boolean(Number(req.body.newsDisplay)),
  };

  mongoClient.connect(url, function (err, client) {
    let db = client.db('news');

    db.collection('news_list')
      .insertOne(news, function (err, data) {
        console.log(data);
        console.log('Insert news completed');

        res.redirect('/news');
        client.close();
      });
  });
})

// edit news form
router.get('/edit/:id', function (req, res) {
  let id = req.params.id;

  mongoClient.connect(url, function (err, client) {
    let db = client.db('news');

    let query = {
      _id: mongodb.ObjectId(id)
    };
    db.collection('news_list')
      .findOne(query, function (err, news) {
        console.log(news);

        mongoClient.connect(url, function (err, client) {
          let db = client.db('news');

          db.collection('news_category')
            .find({}, {
              projection: {
                CategoryName: 1
              }
            }).toArray(function (err, categoryList) {
              console.log(categoryList);

              res.render('news-edit', {
                news: news,
                categoryList: categoryList,
              });
              client.close();
            });
        });

      });
  });
})

// update news 
router.put('/:id', function (req, res) {
  let id = req.params.id;

  mongoClient.connect(url, function (err, client) {
    let db = client.db('news');

    let query = {
      _id: mongodb.ObjectId(id)
    };

    let newsValueSet = {
      $set: {
        NewsName: req.body.newsName,
        NewsCategoryId: req.body.newsCategoryId,
        NewsContent: req.body.newsContent,
        NewsOrder: Number(req.body.newsOrder),
        NewsDisplay: Boolean(Number(req.body.newsDisplay)),
      }
    };

    db.collection('news_list')
      .updateOne(query, newsValueSet, function (err, data) {
        console.log(data);
        res.json(data);

        client.close();
      });
  });
})

// delete news
router.delete('/:id', function (req, res) {
  let id = req.params.id;

  mongoClient.connect(url, function (err, client) {
    let db = client.db('news');

    let query = {
      _id: mongodb.ObjectId(id)
    };

    db.collection('news_list')
      .deleteOne(query, function (err, data) {
        console.log(data);
        console.log('Delete data completed ~');
        res.json(data);

        client.close();
      });
  });
})

module.exports = router;