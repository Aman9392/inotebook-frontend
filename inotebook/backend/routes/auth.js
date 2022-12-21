const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = "AMANISGOOD$MP";

// Route 1:  creat a user using : POST "/api/auth/creatuser"  .No  login required Does'nt require auth

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
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // create New a User
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);

    // res.json({ user })
    res.json({ authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }
})


// Route 2: Authenticat a Uer  using : POST "/api/auth/login"  .No  login required Does'nt require auth

router.post('/login', [
  body('email', 'Enter valid email').isEmail(),
  body('password', 'Password canbe not Blank').exists(),
], async (req, res) => {
  // if threr are error it return bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct Crudential" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please try to login with correct Crudential" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);

    // res.json({ user })
    res.json({ authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error occured");
  }
})


// Route 3:  Get loggedin  User Deteil  using : POST "/api/auth/getuser"  .   login required 
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select(" -password")
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error occured");
  }
})
module.exports = router