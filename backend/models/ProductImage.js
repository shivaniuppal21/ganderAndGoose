const conn = require('./db');

const ProductImage = conn.define(
    "productImage",
   {
    type: {
      type: conn.Sequelize.STRING,
    },
    name: {
      type: conn.Sequelize.STRING,
    },
    data: {
      type: conn.Sequelize.BLOB("long"),
    },
   });
   
   module.exports = ProductImage;

   