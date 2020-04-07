const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// ------------------------- MONGODB DECLARATIONS ------------------------------------ //
// mongoose.connect('mongodb+srv://****:*****@*****.mongodb.net/blogDB', {
//   useNewUrlParser: true
// });

// const wikiSchema = new mongoose.Schema({
//   name: String,
//   content: String
// });

// const Wiki = mongoose.model('Wiki', wikiSchema);
// ------------------------- MONGODB DECLARATIONS ------------------------------------ //

app.listen(3000, function () {
  console.log('...server has started on port 3000');
});
