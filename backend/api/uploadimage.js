const multer = require('multer')
global.__basedir = __dirname;
const models = require('../models').models;

const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
let uploadFile = multer({ storage: storage})

const uploadFiles = async (req, res) => {
    try {
      console.log(req.file);
  
      if (req.file == undefined) {
        return res.send(`You must select a file.`);
      }
      console.log(req.file)

      models.ProductImage.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        data: fs.readFileSync(
          __basedir + "/public/images/product/" + req.file.filename
        ),
        productId: req.params.id
      }).then((image) => {
        fs.writeFileSync(
            // Eventually frontend to decide
          __basedir + "/uploads/" + image.name,
          image.data
        );
  
        return res.send(`File has been uploaded.`);
      });
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying upload images: ${error}`);
    }
  };
  
  
  module.exports = {
    uploadFiles: uploadFiles,
    uploadFile:uploadFile
    }
