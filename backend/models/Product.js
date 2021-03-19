const conn = require('./db');

const Product = conn.define('product', {
title: {
    type: conn.Sequelize.STRING(50),
    //allowNull: false,
},
description: {
  type: conn.Sequelize.TEXT,
},
shortdescription: {
  type: conn.Sequelize.TEXT,
},
price: {
  type: conn.Sequelize.DECIMAL(20, 2),
  //allowNull: false,
},
stock: {
  type: conn.Sequelize.INTEGER(11),
  //allowNull: false,
},
createdAt: {
  type: conn.Sequelize.DATE,
  //allowNull: false,
  defaultValue: new Date(),
  field: 'created_at'
},
updatedAt: {
  type: conn.Sequelize.DATE,
  allowNull: false,
  defaultValue: new Date(),
  field: 'updated_at'
},
rating : {
  type : conn.Sequelize.INTEGER,
  Default : 0
},
images : {
  type : conn.Sequelize.ARRAY(conn.Sequelize.STRING),
  Default : 0
},
customizations:{
  type : conn.Sequelize.ARRAY(conn.Sequelize.JSON)
},
variants:{
  type : conn.Sequelize.ARRAY(conn.Sequelize.JSON)
},
category:{
    type: conn.Sequelize.STRING
},
});


module.exports = Product;