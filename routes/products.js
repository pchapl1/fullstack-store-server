var express = require('express');
const { uuid } = require('uuidv4');
const { route } = require('.');
const { db } = require('../mongo');
var router = express.Router();

router.get('/products', function(req, res, next){

    res.json( {
        success: true,
        message: "orders"
    })
})

module.exports = router;