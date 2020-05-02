const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '',
	database: 'competencias'
});

connection.connect(err => {
	if (err) {
		return console.error('Connection error: ' + err.stack);
	}
	console.log(`Database connected with the id ${connection.threadId}`);
});

module.exports = connection;