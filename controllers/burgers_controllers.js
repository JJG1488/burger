const express = require('express');
const router = express.Router();
const burgers = require('../models/burger');

router.get('/', (req, res) => {
    burgers.all((data) => {
        const burgs = {
            burgers: data,
        }
        console.log(burgs);
        res.render('index', burgs)
    });
});

module.exports = router;



