const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8000,

    JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_must_be_changed',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',

    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_NAME: process.env.DB_NAME || 'express_auth_db',
    DB_PORT: parseInt(process.env.DB_PORT, 10) || 3306,
};

export default config;