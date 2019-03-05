var express = require('express');
var router = express.Router();

//Models
const Movie = require("../models/Movie");

router.post('/', (req, res, next) => {
  //const { title, country, imdb_score, year, category } = req.body;

  const movie = new Movie(req.body);

  /* movie.save((err, data) => {
     if (err)
       res.json(err);
 
     res.json({ status: 1 });
   });  */

  const promise = movie.save();
  promise.then((data) => {
    res.json({ status: 1 });
  }).catch((err) => {
    res.json(err);
  });

});

module.exports = router;
