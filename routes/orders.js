var express = require('express');
const { uuid } = require('uuidv4');
const { route } = require('.');
const { db } = require('../mongo');
var router = express.Router();


router.get('/user/orders', async function(req, res, next){
    return {
        success: true,
        message: "orders"
    }
})


module.exports = router;
