const conn = require('./db');
const ProductImage = require('../models/ProductImage')

const Product = conn.define('product', {
product_id: {
    type: conn.Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey:true,
    autoIncrement: true,
  },
title: {
    type: conn.Sequelize.STRING(50),
    allowNull: false,
},
description: {
  type: conn.Sequelize.TEXT,
},
price: {
  type: conn.Sequelize.DECIMAL(20, 2),
  allowNull: false,
},
stock: {
  type: conn.Sequelize.INTEGER(11),
  allowNull: false,
},
createdAt: {
  type: conn.Sequelize.DATE,
  allowNull: false,
  defaultValue: new Date(),
  field: 'created_at'
},
});




//Product.hasMany(ProductImage, {as: 'images', foreignKey: 'product_id'});
 // imgURL: conn.Sequelize.STRING


module.exports = Product;