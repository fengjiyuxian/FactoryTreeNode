var express = require('express');
var router = express.Router();

const Factory = require('../utils/db').Factory;
const Child = require('../utils/db').Child;

/* GET home page. */
router.get('/', function(req, res, next) {
    Factory.findAll({
      raw: true
    })
    .then((set) => {
      // res.status(200).send(set);
      res.render('index', { title: JSON.stringify(set) });
    })
    .catch((err) => {
      res.status(500).send({
        error: err+"could not find factories."
      })
    })

  // res.render('index', { title: 'Express' });
});

router.get('/factory/:factoryId', function(req, res, next) {

})

router.post('/factory', function(req, res, next) {

})

router.put('/factory', function(req, res, next) {

})

router.delete('/factory/:factoryId', function(req, res, next) {

})

router.get('/factory/child/:factoryId', function(req, res, next) {

})

router.post('/factory/child/:childId', function(req, res, next) {

})

router.put('/factory/child/:childId', function(req, res, next) {

})

router.delete('/factory/child/:childId', function(req, res, next) {

})

module.exports = router;
