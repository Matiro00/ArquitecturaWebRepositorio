const mysql = require('mysql2');

const DB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'arqweb'
})


module.exports ={
    DB
}