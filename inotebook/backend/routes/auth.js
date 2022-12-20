const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');



// creat A user using : POST "/api/auth/creatuser"  .No  login required Does'nt require auth

router.post('/creatuser', [
  body('name', 'Enter valid name').isLength({ min: 3 }),
  body('email', 'Enter valid email').isEmail(),
  body('password', 'Enter password atleast 5 charchter').isLength({ min: 5 }),

], async (req, res) => {
  // if threr are error it return bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // check wether the user with the same email id e
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry A user with this same eamil already exists" })
    }
    // create New a User
    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    })
    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    // res.json({error:'Please Enter Unique Email', message: err.message})})
    res.json({ user })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }
})


module.exports = router