const app = require('express').Router();
const models = require('../models').models;
const authenticate = require('./check-auth');
const upload = require('./uploadimage');
const conn = require('../models/db');
const fs = require("fs");



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
app.delete('/:id', authenticate.authenticateAdmin,(req, res, next)=> {
  models.Product.destroy({ where: { id: req.params.id}})
    .then( () => res.sendStatus(204))
    .catch(next);
});

// admin level api (later add autherization)
app.post('/addcategory', authenticate.authenticateAdmin, (req, res, next)=> {
  //  assumes the category does not exist in db already
  models.Category.create(req.body)
  .then(category =>{
    res.send(category)
  })
})

// admin level api
//update product
app.post('/update/:id',authenticate.authenticateAdmin, (req, res, next)=> {
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
  .then(product => {
    res.send(product)
  }).catch( err => {
    res.status(400).send(err)})
});



// upload images to product (admin level api)
app.post('/uploadimage', authenticate.authenticateAdmin, 
upload.uploadFile.single("file"),
(req, res) => {
  console.log(req.body)
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.status(400).send(`You must select a file.`);
    }
 //const filename = path.basename( req.file, extname );

  //var absolutePath = path.join(root,req.file.filename.path) 
    models.ProductImage.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
          __basedir + "/public/images/product/" + req.file.originalname
      ),
      productId: req.params.id
    }).then((image) => {
      fs.writeFileSync(
          // Eventually frontend to decide
        __basedir + "/uploads/" + req.file.filename,
        image.data
      );
      /*return models.Product.update(
          {images : conn.Sequelize.fn('array_append', conn.Sequelize.col('images'), image.name)},
          { where: { id: req.params.id } } )
    .then(()=>{
      return res.status(200).send(req.file);
    })*/
    return res.status(200).send(__basedir + "/uploads/" + req.file.filename);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Error when trying upload images: ${error}`);
  }

})

app.delete('/image/:productid/:name',authenticate.authenticateAdmin, (req, res, next)=> {
  console.log(req.params.type)
models.ProductImage.destroy({ where: { name: req.params.name}})
.then( () => {
  /*return models.Product.update(
    {images : conn.Sequelize.fn('array_remove', conn.Sequelize.col('images'), req.params.name)},
    { where: { id: req.params.productid } } )
    .then(() => {
      res.sendStatus(204)
    })*/
    // TODO
    // Delete from the defined folder as well
    res.sendStatus(204)
})
.catch(next);
})
