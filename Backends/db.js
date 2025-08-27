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


// 
// const mysql = require("mysql2/promise"); // use promise version

// // Create a pool instead of single connection (better for multiple queries)
// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "huroo",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// module.exports = db;