const conn = require('./db');const 

Customization = conn.define('customization', 
{
    leters: {
        type: conn.Sequelize.INTEGER,
        //allowNull: false,
    },
    price: {
      type: conn.Sequelize.DECIMAL(20, 2),
      //allowNull: false,
    }
})


  module.exports = Customization ;