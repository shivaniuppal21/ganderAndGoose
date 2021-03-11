const conn = require('./db');

const Product = conn.define('product', {
product_id: {
    type: conn.Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
  },
title: {
    type: STRING(50),
    allowNull: false,
},
description: {
  type: TEXT,
},
price: {
  type: DECIMAL(20, 2),
  allowNull: false,
},
stock: {
  type: INTEGER(11),
  allowNull: false,
},
createdAt: {
  type: DATE,
  allowNull: false,
  defaultValue: new Date(),
  field: 'created_at'
},
});

Product.hasMany(models.ProductImage, {as: 'images'});
 // imgURL: conn.Sequelize.STRING


module.exports = Product;