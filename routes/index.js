var express = require('express');
var router = express.Router();

const Factory = require('../utils/db').Factory;
const Child = require('../utils/db').Child;

/* GET home page. */
router.get('/',function(req, res, next) {
  res.render('index', { 
    title: "index"
  });
});

router.get('/factory', function(req, res, next) {
  Factory.findAll({
    raw: true
  })
  .then((set) => {
    res.status(200).send({
      factory: set
    });
  })
  .catch((err) => {
    res.status(500).send({
      error: err
    });
  });
})

router.post('/factory', function(req, res, next) {
  Factory.create(req.body).then((set) => {
    res.status(200).send({
      factory: set
    });
  }).catch((err) => {
    res.status(400).send({
      error: err
    });
  });
})

router.put('/factory', function(req, res, next) {
  let data = {};
  data['name'] = req.body.name;
  data['min'] = req.body.min;
  data['max'] = req.body.max;

  Factory.update(data,{
    where:{
      factoryId: req.body.factoryId
    }
  }).then((set) => {
    res.status(200).send({
      factory: set
    });
  }).catch((err) => {
    res.status(400).send({
      error: err
    });
  });
})

router.delete('/factory/:factoryId', function(req, res, next) {
  Child.destroy({
    where: {
      factoryId: req.params.factoryId
    }
  })
  Factory.destroy({
    where: {
      factoryId: req.params.factoryId
    }
  }).then((set) =>{
    res.status(200).send(null);
  }).catch((err) => {
    res.status(500).send({
      error: err
    });
  });
  
})

router.get('/factory/child/:factoryId', function(req, res, next) {
  Child.findAll({
    raw: true,
    where: {
      factoryId: req.params.factoryId
    }
  }).then((set) => {
    res.status(200).send({
      children: set
    });
  }).catch((err) => {
    res.status(500).send({
      error: err
    });
  });
})

// router.post('/factory/child/:childId', function(req, res, next) {

// })

// router.put('/factory/child/:childId', function(req, res, next) {

// })

// router.delete('/factory/child/:childId', function(req, res, next) {

// })


/**
 * description: generate factory's children accoring to limit
 * Input(body): factoryId, count
 */
router.post('/factory/generate', async function(req, res, next) {
  
  if(req.body.count < 0 || req.body.count > 15){
    res.status(400).send(null);
  }else{
    let factory = await Factory.findAll({
      raw: true,
      where: {
        factoryId: req.body.factoryId
      }
    }).then((set) => {
      return set;
    }).catch((err) => {
      res.status(500).send({
        error: err
      });
    });
    factory = factory[0];
    await Child.destroy({
      where: {
        factoryId: req.body.factoryId
      }
    })
    console.log(factory);
    let data = randomNumber(factory['min'], factory['max'], req.body.count);
    let arr = [];
    for(let i = 0; i < data.byteLength; i++){
      arr.push({
        factoryId: factory["factoryId"],
        value: data[i],
        status: 1
      });
    }
    console.log(data,arr);
    Child.bulkCreate(arr).then((set) => {
      res.status(200).send({
        children: arr
      });
    }).catch((err) => {
      res.status(500).send({
        error: err
      });
    });
  }
  


})

function randomNumber(min, max, n){
  var data = new ArrayBuffer(n);
  for(let i = 0; i < n; i++){
    data[i] = parseInt(Math.random()*(max-min+1)+min,10);
  }
  return data;
}

module.exports = router;
