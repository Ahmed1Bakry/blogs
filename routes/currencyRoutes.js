const express = require('express');
const router = express.Router();
var axios = require("axios").default;

var symbolsOptions = {
  method: 'GET',
  url: 'http://data.fixer.io/api/symbols',
  params: {
    access_key: 'bd1a85fd2f93a08ed0a427695b3ed9e4'
  }
};

var convertOptions = {
  method: 'GET',
  url: 'http://data.fixer.io/api/latest',
  params: {
    access_key: 'bd1a85fd2f93a08ed0a427695b3ed9e4'
  }
};

var symbols;
var rates;

//Middleware to get names of currencies available on the database
router.use((req, res,next) => {
    axios.request(symbolsOptions).then(function (response) {
        symbols = response.data.symbols;
        next();
    }).catch(function (error) {
        console.error(error);
    });
});

//Middleware to get currencies rates
router.use((req, res,next) => {
  axios.request(convertOptions).then(function (response) {
    rates = response.data.rates;
    next();
  }).catch(function (error) {
    console.error(error);
  });
});

//Currency converter page
router.get('/', (req, res) => {
  res.render('currency', {rates,symbols, title: 'Currency Converter' });
});


module.exports = router;