const conn = require('./db');

const User = conn.define('user', {
    // Model attributes are defined here
    id: {
        allowNull: false,
        type: DataTypes.UUID,
        unique: true,
        validate: {
             isUUID: 4
        }
  },
  /* id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true */

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
    confirmPassword: {
        type: conn.Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please complete Confirm Password' }
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
}, {
        indexes: [{ unique: true, fields: ['email'] }] //what does this represent??
    });

module.exports = User;