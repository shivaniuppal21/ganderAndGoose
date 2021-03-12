const conn = require('./db');

const ProductImage = conn.define(
    "productImage",
   {
   id: {
     type: conn.Sequelize.INTEGER,
     primaryKey: true,
   },
   images: {
     type: conn.Sequelize.STRING,
   },
   });
   
   module.exports = ProductImage;

   /*
   ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product)
    , {
     foreignKey: "product_id",
   };
    };
   */