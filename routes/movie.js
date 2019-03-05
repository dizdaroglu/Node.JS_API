var express = require('express');
var router = express.Router();

//Models
const Movie = require("../models/Movie");



router.get("/", (req, res) => {
  const promise = Movie.find({});
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
//TOP 10 List
router.get("/top10", (req, res) => {
  const promise = Movie.find({}).limit(10).sort({ imdb_score: -1 });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
router.get("/:movies_id", (req, res, next) => {
  const promise = Movie.findById(req.params.movies_id);
  promise.then((movie) => {
    if (!movie)
      next('bulunamadı');

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});
router.put("/:movies_id", (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(
    req.params.movies_id,
    req.body,
    {
      new: true
    }
  );
  promise.then((movie) => {
    if (!movie)
      next({ message: 'bulunamadı' });

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.delete("/:movies_id", (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movies_id);
  promise.then((movie) => {
    if (!movie)
      next('bulunamadı');

    res.json({ status: 1 });
  }).catch((err) => {
    res.json(err);
  });
});
router.post('/', (req, res, next) => {
  //const { title, country, imdb_score, year, category } = req.body;

  const movie = new Movie(req.body);

  const promise = movie.save();
  promise.then((data) => {
    res.json({ status: 1 });
  }).catch((err) => {
    res.json(err);
  });

});
//between

router.get("/between/:start_year/:end_year", (req, res) => {
  const { start_year, end_year } = req.params;

  const promise = Movie.find({
    year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
  });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
module.exports = router;
