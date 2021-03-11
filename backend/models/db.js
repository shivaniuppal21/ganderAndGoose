  
const Sequelize = require('sequelize');

console.log(process.env.DATABASE_URL)
const conn = new Sequelize('postgres', 'postgres', 'postgres',{
    //connectionString: process.env.DATABASE_URL || ""
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  }, { logging: false});

module.exports = conn;