var express = require('express');
var router = express.Router();
const card_items = require('../data/data_card');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index',{items : card_items});
});


module.exports = router;
