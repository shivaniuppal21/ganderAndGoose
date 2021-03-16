const app = require('express').Router();
const models = require('../models').models;
const authenticate = require('./check-auth');

module.exports = app;

app.get('/', (req, res, next)=> {
  console.log(req.params.type)
models.Product.findAll({ order: [['id']]})
  .then( products => res.send(products))
  .catch(next);
});

/* Sort By Type */
app.get('/orderby/:type', (req, res, next)=> {
  console.log(req.params.type)
models.Product.findAll({ order: [[req.params.type]]})
  .then( products => res.send(products))
  .catch(next);
});

app.get('/:id', (req, res, next)=> {
    models.Product.findOne({ where: { id: req.params.id } } )
      .then( product => res.send(product))
      .catch(next);
  });

// admin level api
app.delete('/:id', (req, res, next)=> {
  models.Product.destroy({ where: { id: req.params.id}})
    .then( () => res.sendStatus(204))
    .catch(next);
});

// admin level api (later add autherization)
app.post('/addcategory', (req, res, next)=> {
  //  assumes the category does not exist in db already
  models.Category.create(req.body)
  .then(category =>{
    res.send(category)
  })
})

// admin level api
//update product
app.post('/update/:id', (req, res, next)=> {
  new Promise( (resolve,reject) => {
    if (req.params.id){
      models.Product.update(
        req.body,
        { where: { id: req.params.id } }
      )
        .then(result => {
          return resolve(result) }
        )
        .catch(err =>
          {
            return reject(err) }
        )
    }
  })
  .then( (result) => res.send(result))
  .catch( err => {
    res.status(500).send(err)})
  
});

//create product (admin level api)
app.post('/create',authenticate.authenticateAdmin, (req, res, next)=> {
  //  assumes the product does not exist in db already
  console.log(req.userid)
  models.Product.create(req.body)
  .then(product =>{
    res.send(product)
  }).catch( err => {
    res.status(400).send(err)})
});

