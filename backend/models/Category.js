const conn = require('./db');

const Category = conn.define('category', {
      name: {
            type: conn.Sequelize.STRING
      },
      description: {
                  type: conn.Sequelize.TEXT,
                }
      }

);

module.exports = Category;