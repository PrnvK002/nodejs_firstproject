var express = require('express');
var router = express.Router();
const {card_items,users} = require('../data/data_card');
const {check, validationResult} = require('express-validator');

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('index',{items : card_items,email:req.session.user,status:req.session.loginStatus});
});
router.get('/login',(req,res)=>{
  res.render('login');
})
router.get('/register',(req,res)=>{
  res.render('register');
})
router.post('/login',(req,res)=>{
    
});

//registered data checking and saving
router.post('/register',[
  check('username').not().isEmpty().isIn([1,2,3,4,5,6,7,8,9,0,".",",",">","<","!","&","*","#","$","@","%"]).withMessage("Enter a valid name with only letters no numbers or symbols allowed"),
  check('email','Your email is not valid').not().isEmpty().isEmail(),
  check('password').not().isEmpty().isLength({min:5}), 
  check('password_confirm',"Passwords don't match").not().isEmpty().isLength({min:5}).custom((value,{req})=>{value === req.body.password})
],
(req,res)=>{
  // console.log(req.body);
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).jsonp(errors.array());
  }
  else{
    req.session.user = req.body.email;
    req.session.loginStatus = true;
    users.append(req.body);
    res.redirect('/');
  }
});

router.get('/logout',(req,res)=>{
  req.session.loginStatus = false;
  req.session.destroy();
});
module.exports = router;
