var express = require("express");
var router = express.Router();
const { card_items, users,hotels } = require("../data/data_card");
const { body, validationResult } = require("express-validator");

/* GET users listing. */

router.get("/", function (req, res) {
  let user = req.session.user;
  if(user){
    res.render("index", { items: card_items , user });
  }
  else{
    res.redirect('/login');
  }
});

//redirecting to  the login page 
router.get("/login",
(req, res) => {
  let user = req.session.user;
  if(user){
    res.redirect('/');
  }
  else{
    res.render("login");
  }
});

//for new users register page
router.get("/register", (req, res) => {
  let user = req.session.user;
  if(user){
    res.redirect('/');  
  }
  else{
    res.render("register");
  }
});

//login checking
router.post("/login", 
[
  body("email")
    .isEmail()
    .withMessage("Your email is not valid"),
  body("password")
    .isLength({ min: 5 })
    .withMessage(
      "Your password is not matching with any data"
    )
]
,(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("login",{ msg : "Please check the credentials you have entered"})
    // return res.status(422).json({ success: false, errors: errors.array() });
  } else {
    
    let status = users.find((user) => { return user.email == req.body.email});
    if(req.body.password == status.password ) {
      req.session.user = req.body;
      req.session.loginStatus = true;
      res.redirect("/");
    }
    else{
      res.render("login",{ msg : `Please check the credentials you have entered`})
    }
  }
});

//registered data checking and saving
router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Your email is not valid"),
    body("password")
      .isLength({ min: 5 })
      .withMessage(
        "Your password is invalid password must contain atleast 5 characters"
      ),
    body("password_confirm")
      .isLength({ min: 5 })
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords don't match"),
  ],
  (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('register',{msg:errors.msg})
      // return res.status(422).json({ success: false, errors: errors.array() });
    } else {
      req.session.user = req.body.email;
      users.push(req.body);
      res.redirect("/");

    }
  }
);

//making entire products visible as a table
router.get('/products',(req,res)=>{
  res.render('products',{card_items});
});

//Showing the hotels that they have already know
router.get('/contact',(req,res)=>{
  res.render('contact',{users,hotels})
  console.log(hotels);
});

//deleting user from session
router.get("/logout", (req, res) => {
  delete req.session.user;
  res.redirect("/login");
});

module.exports = router;
