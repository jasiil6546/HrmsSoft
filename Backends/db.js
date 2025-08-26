const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'huroo'
});

connection.connect((error) => {
    if (error) {
        console.error("Database connection failed:", error);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = connection; // export only the connection
