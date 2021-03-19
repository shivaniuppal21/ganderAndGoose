const conn = require('./db');const 

Customizations = conn.define('customizations', 
{
    letters: {
        type: conn.Sequelize.INTEGER,
        //allowNull: false,
    },
    price: {
      type: conn.Sequelize.DECIMAL(20, 2),
      //allowNull: false,
    }
})


  module.exports = Customizations ;