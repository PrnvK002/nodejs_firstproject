var express = require('express');
var router = express.Router();
const { card_items, users } = require("../data/data_card");
const { body, validationResult } = require("express-validator");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', );
});

module.exports = router;
