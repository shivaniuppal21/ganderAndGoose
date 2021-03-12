const conn = require('./db');

const User = conn.define('user', {
    // Model attributes are defined here
    /*id: {
        allowNull: false,
        primaryKey:true,
        type: conn.Sequelize.UUID,
        unique: true,
        validate: {
             isUUID: 4
        
  },}*/
    id: {
    type: conn.Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true },

    firstName: {
        type: conn.Sequelize.STRING,
        validate: {
            requiresContent: function (value) {
                if (value === "" || value === null) {
                    throw new Error('Validation error');
                }
            }
        }
    },

    lastName: {
        type: conn.Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please complete Last Name' }
        }
    },
    email: {
        type: conn.Sequelize.STRING,
        validate: {
            isEmail: true,
            notEmpty: { msg: 'Please complete Email' }
        }
    },
    password: {
        type: conn.Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please complete Password' }
        }
    },
    mobile: {
        type: conn.Sequelize.STRING,
        validate: {
            isNumeric: true,
            notEmpty: { msg: 'Please complete mobile' }
        }
    },
    zipCode: {
        type: conn.Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please complete Zip Code' }
        }
    },
    Country: {
        type: conn.Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please complete Country' }
        }
    },

    isAdmin:{
        type: conn.Sequelize.BOOLEAN
    },
}, {
        indexes: [{ unique: true, fields: ['email'] }] 
    });

module.exports = User;