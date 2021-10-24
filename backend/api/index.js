const express = require('express');
const router = express.Router();
const Weather = require('./weather');

const cityNames = require('./test.json');
const c = new Intl.Collator();
let cityToCoord = {};
let cityJSON = cityNames.sort((a, b) => {
  return c.compare(a.norm, b.norm);
});

for (let i = 0; i < cityJSON.length; i += 1) {
  cityToCoord[cityJSON[i].name.toLocaleLowerCase()] = cityJSON[i].coord;
}

// console.log(cityJSON[0]);
// /* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// GET Request for autosuggest
router.get('/suggestions', async (req, res) => {
  let term = req.query.name.toLocaleLowerCase();
  let weather = new Weather();
  let suggestions = await weather.getWeatherDataFromTerm(term, cityJSON);
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(suggestions));
});

router.get('/weather', async (req, res) => {
  let coord = { lat: req.query?.lat, lon: req.query?.lon };
  let cityname = req.query?.name?.toLocaleLowerCase();
  if (coord.lat && coord.lon) {
    let weather = new Weather();
    let data = await weather.getWeatherDataFromCoord(coord);
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  } else if (cityname) {
    coord = cityToCoord[cityname];
    let weather = new Weather();
    let data = await weather.getWeatherDataFromCoord(coord);
    //TODO check to make sure data isnt 404 or blank
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  }
});

module.exports = router;
