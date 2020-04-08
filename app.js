const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// ------------------------- MONGODB DECLARATIONS ------------------------------------ //
mongoose.connect('mongodb://localhost:27017/wikiDB', {
  useNewUrlParser: true,
});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model('Article', articleSchema);
// ------------------------- MONGODB DECLARATIONS ------------------------------------ //

// //HTTP Verb "GET" - will fetch all the articles
// app.get('/articles', function (req, res) {
//   Article.find({}, function (err, foundArticles) {
//     if (!err) {
//       res.send(foundArticles);
//     } else {
//       res.send(err);
//     }
//   });
// });

// //HTTP Verb "POST" - will add another article to the database
// app.post('/articles', function (req, res) {
//   console.log(req.body.title);
//   console.log(req.body.content);

//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content,
//   });
//   newArticle.save(function (err) {
//     if (!err) {
//       res.send('successful article load.');
//     } else {
//       res.send(err);
//     }
//   });
// });

// //HTTP Verb "DELETE" - will fetch all the articles
// app.delete('/articles', function (req, res) {
//   Article.deleteMany(function (err) {
//     if (!err) {
//       res.send('successfully deleted all articles');
//     } else {
//       res.send(err);
//     }
//   });
// });

// ExpressJS Route Chaining for GET, POST and DELETE on all Articles
app
  .route('/articles')
  .get(function (req, res) {
    Article.find({}, function (err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  .post(function (req, res) {
    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newArticle.save(function (err) {
      if (!err) {
        res.send('successful article load.');
      } else {
        res.send(err);
      }
    });
  })
  .delete(function (req, res) {
    Article.deleteMany(function (err) {
      if (!err) {
        res.send('successfully deleted all articles');
      } else {
        res.send(err);
      }
    });
  });

// ExpressJS Route Chaining for GET, POST and DELETE on specific Articles using Express route parameters

app.route('/articles/:articleTitle').get(function (req, res) {
  Article.findOne({ title: req.params.articleTitle }, function (
    err,
    foundArticle
  ) {
    if (foundArticle) {
      res.send(foundArticle);
    } else {
      res.send('No articles with that title found');
    }
  });
});

app.listen(3000, function () {
  console.log('...server has started on port 3000');
});
