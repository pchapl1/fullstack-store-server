var express = require('express');
const { uuid } = require('uuidv4');
const { route } = require('.');
const { db } = require('../mongo');
var router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
require("dotenv").config();
var { validateUserData } = require('../validations/users.js');
const https = require('https')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// post route
router.post('/register', async function(req, res, next){
  
  let firstName = ""
  let lastName = ""
  let phoneNumber = ""

  // get user info from request body
  const email = req.body.email
  const password = req.body.password

  if (req.body.firstName) {
    firstName = req.body.firstName
  }

  if (req.body.lastName) {
    lastName = req.body.lastName
  }

  if (req.body.phoneNumber) {
    phoneNumber = req.body.phoneNumber
  }


  const userData = {
    email: email,
    password: password
  }
  
  // validate user data
  const validatedUser = validateUserData(userData)
  if (!validatedUser.isValid) {
    return {
      success : false,
      message : validatedUser.message
    }
  }
  const saltRounds = 5
  const salt = await bcrypt.genSalt(saltRounds);
  
  const passwordHash = await bcrypt.hash(password, salt);


  
  // create user object
  const user = {
    email,
    password: passwordHash, 
    firstName,
    lastName,
    phoneNumber,
    id: uuid(),
    cart : []
  }
  
  // insert user into db
  await db().collection('users').insertOne(user)

  const test = await db().collection('users').find({})
  console.log(test)
  res.json({
    success: true,
    message : "user created successfully"
  })
})



router.post('/login', async function(req, res, next){

  const email = req.body.email
  const password = req.body.password

  const loginData = {
    email,
    password
  }

  const validatedLogin = validateUserData(loginData)

  if (!validatedLogin.isValid) {
    return {
      success: false,
      message: validatedLogin.message
    }
  }

  const user = await db().collection('users').findOne({
    email: email
  })

  if (!user) {
    res.json({
      success: false,
      msg: "Could not find user"
    }).status(204)
    return;
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    res.json({
      success: false,
      msg: "Password was incorrect"
    }).status(204)
    return
  }


  const userData = {
    date: new Date(),
    userId: user.id,
  }

  const payload = {
    userData,
    exp: Math.floor(Date.now() / 100 + (60 * 60))
  }


  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  console.log(jwtSecretKey)
  const token = jwt.sign(payload, jwtSecretKey);

  res.json({
    success: true,
    token: token,
    email: user.email
  })
})

router.put('/update-user/:id', async function(req, res, next){

  const userToUpdate = req.params.id

  const email = req.body.email
  const password = req.body.password
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const phoneNumber = req.body.lastName

  const userData = {
    email,
    password,
    firstName,
    lastName,
    phoneNumber
  }

  const validatedUser =  validateUserData(userData)

  if (!validatedUser.isValid) {
    return res.json({
      success: false,
      message: validatedUser.message
    })
  }

  const user = await db().collection('users').findOneAndUpdate({
    id: userToUpdate
  },
  {
    $set: {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber
    }

  }
  
  )

  console.log(user)

  res.json({
    success: true,
    message: 'user updated successfully'
  })
})

router.put('/add-to-cart/:id', async function(req, res, next){

  const userToUpdate = req.params.id

  const productsToAdd = req.body.cart


  const user = await db().collection('users').findOneAndUpdate({
    id: userToUpdate
  },
  {
    $set: {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber
    }

  }
  
  )

  console.log(user)

  res.json({
    success: true,
    message: 'user updated successfully'
  })
})

router.get('/products/all', async function(req, res, next){
  const url = 'https://fakestoreapi.com/products'

  const products = await fetch(url).then((response) => {
    return response.json()
    }).then((data) => {
    console.log(data)
    const productData = data
    return productData
 })

  res.json({
    success: true,
    message: 'all products',
    products : products
  })
  })



router.get('/orders/all', function(req, res, next){

  res.json( {
      success: true,
      message: "orders"
  })
})

router.get('/orders/:id', function(req, res, next){

  res.json( {
      success: true,
      message: "orders 1"
  })
})

router.post('/orders/create-order', function(req, res, next){

  res.json( {
      success: true,
      message: "orders post"
  })
})

module.exports = router;