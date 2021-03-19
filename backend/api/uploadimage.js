const multer = require('multer')
const models = require('../models').models;
const conn = require('../models/db');
var path = require('path');

const fs = require("fs");

const db = require("../models");
const Image = db.images;


const uploadFiles = async (req, res) => {
  let retImages = []

  try {
    console.log(req.files);
    if (req.files.length <1) {
      return res.send(`You must select a file.`);
    }
for (let file of req.files){
 

  await models.ProductImage.create({
    type: file.mimetype,
    name: file.originalname,
    data: fs.readFileSync(
      __basedir + "/resources/static/assets/uploads/" + file.filename
    ),
  }).then((image) => {
    fs.writeFileSync(
      __basedir + "/resources/static/assets/tmp/" + image.name,
      image.data
    );
    retImages.push("/resources/static/assets/uploads/" + file.filename);
  });
} 

//console.log(retImages)
return res.send(retImages);
}
catch (error) {
  console.log(error);
  return res.send(`Error when trying upload images: ${error}`);
}


};

module.exports = {
  uploadFiles,
};

