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

router.post('/api/burgers', (req, res)=>{
    burgers.create(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], (data) => {
        res.json({ id: data.insertId })
    });
});

router.put('/api/burgers/:id', (req, res)=>{
    const condition = `id = ${req.params.id}`;

    console.log('condition', condition);

    burgers.update(
        {
            devoured: req.body.devoured,
        },
        condition,
        data => {
            if(data.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

router.delete('/api/burgers/:id', (req, res)=>{
    const condition = `id = ${req.params.id}`;

    burgers.delete(condition, data => {
        if(data.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

module.exports = router;



