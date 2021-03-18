const conn = require('./db');const 

Productvariants = conn.define('productvariants', {
    color: {
        type: conn.Sequelize.STRING(50),
        //allowNull: false,
    },
    size: {
      type: conn.Sequelize.TEXT,
    },
    price: {
      type: conn.Sequelize.DECIMAL(20, 2),
      //allowNull: false,
    }
  });

  module.exports = Productvariants;