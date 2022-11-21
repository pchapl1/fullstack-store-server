var express = require('express');
const { uuid } = require('uuidv4');
const { route } = require('.');
const { db } = require('../mongo');
var router = express.Router();


router.get('/user/wishlist', function(req, res, next){
    return {
        success: true,
        message: "wishlist"
    }
})


module.exports = router;