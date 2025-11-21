import 'dotenv/config';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PSWD,
    database: process.env.DTBS,
    port: process.env.PORT,
    queueLimit: 0
});

export default pool;