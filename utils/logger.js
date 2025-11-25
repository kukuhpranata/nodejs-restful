import process from 'process';

const getTimeStamp = () => new Date().toISOString();

const log = {
    info: (message) => console.log(`[INFO] ${getTimeStamp()} - ${message}`),
    warn: (message) => console.warn(`[WARN] ${getTimeStamp()} - ${message}`),
    error: (message, details = '') => console.error(`[ERROR] ${getTimeStamp()} - ${message}`, details),
    debug: (message) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[DEBUG] ${getTimeStamp()} - ${message}`);
        }
    }
};

export default log;