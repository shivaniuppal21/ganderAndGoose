const conn = require('./db');

const Mail = conn.define('mail', {
	from: {
		type: conn.Sequelize.STRING,
		required: true
	},
	to: {
		type: conn.Sequelize.STRING,
		required: true
	},
	subject: {
		type: conn.Sequelize.STRING,
		default: '-',
		required: true
	},
	text: {
		type: conn.Sequelize.TEXT,
		required: true,
		default: '-'
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
});

module.exports = Mail;
