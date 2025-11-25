import mysql from 'mysql2/promise';
import config from './env.config.js';
import log from '../utils/logger.js';
import process from 'process';

let pool;

async function connectDB() {
    try {
        pool = mysql.createPool({
            host: config.DB_HOST,
            port: config.DB_PORT,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            database: config.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        await pool.getConnection()
            .then(connection => {
                connection.release();
                log.info(`DB Config: Successfully connected to MySQL database: ${config.DB_NAME} on port ${config.DB_PORT}`);
            })
            .catch(err => {
                log.error('DB Config: Could not establish a connection to MySQL.', err.message);
                process.exit(1);
            });

    } catch (error) {
        log.error('DB Config: Error creating MySQL pool:', error);
        process.exit(1);
    }
}

async function query(sql, values = []) {
    if (!pool) {
        throw new Error("Database pool not initialized. Call connectDB() first.");
    }
    const [rows] = await pool.execute(sql, values);
    return rows;
}

connectDB();

export {
    query,
    pool,
    connectDB
};