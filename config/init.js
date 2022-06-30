const mysql = require('mysql2/promise');
require('dotenv').config();

const {DB_NAME, DB_USER} = process.env;

(async () => {
    try{
        const statement1 = `DROP DATABASE IF EXISTS ${DB_NAME}`;
        const statement2 = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;
        const db = await mysql.createConnection(`mysql://${DB_USER}@localhost:3306`);
        await db.execute(statement1);
        await db.execute(statement2);
        console.log(`${DB_NAME} created`);
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit();
    }
})();