const multer = require('multer')
global.__basedir = __dirname;
const models = require('../models').models;
const conn = require('../models/db');
var path = require('path');

const fs = require("fs");
var root = path.dirname(require.main.filename)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() +'-'+ file.originalname)
  }
})
let uploadFile = multer({ storage: storage})

const uploadFiles = async (req, res) => {
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
          __basedir + "/uploads/" + image.name,
          image.data
        );
        /*return models.Product.update(
            {images : conn.Sequelize.fn('array_append', conn.Sequelize.col('images'), image.name)},
            { where: { id: req.params.id } } )
      .then(()=>{
        return res.status(200).send(req.file);
      })*/
      return res.status(200).send(__basedir + "/uploads/" + image.name);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(`Error when trying upload images: ${error}`);
    }
  };
  
  
  module.exports = {
    uploadFiles: uploadFiles,
    uploadFile:uploadFile
    }
