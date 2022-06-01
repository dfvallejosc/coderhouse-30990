const { Router } = require('express');
const Container = require('../container');

const cities = new Container('cities.txt');
cities.init();

const router = Router();

router.get('/', (req, res)=>{
    res.send(cities.data)
})


module.exports = router;