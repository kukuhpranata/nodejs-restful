import { query } from '../config/db.config.js';
import bcrypt from 'bcrypt';

function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

const findById = async (id) => {
    const sql = 'SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?';
    const rows = await query(sql, [id]);
    return rows[0] || null;
};


const findByEmail = async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const rows = await query(sql, [email]);
    return rows[0] || null;
};

const create = async ({ email, password, name }) => {
    const hashedPassword = hashPassword(password);
    const sql = `
        INSERT INTO users (name, email, password, created_at, updated_at) 
        VALUES (?, ?, ?, NOW(), NOW())
    `;

    try {
        const result = await query(sql, [name, email, hashedPassword]);
        const insertId = result.insertId;

        const [newUser] = await query('SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?', [insertId]);

        return newUser || null;

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return null;
        }
        throw error;
    }
};

const comparePassword = (rawPassword, hashedPassword) => {
    return bcrypt.compare(rawPassword, hashedPassword)
};

const update = async (id, updates) => {
    const setClauses = [];
    const updateValues = [];

    if (updates.name) {
        setClauses.push('name = ?');
        updateValues.push(updates.name);
    }
    if (updates.email) {
        setClauses.push('email = ?');
        updateValues.push(updates.email);
    }

    if (setClauses.length === 0) {
        return await findById(id);
    }

    setClauses.push('updated_at = NOW()');
    updateValues.push(id);

    const sql = `
        UPDATE users SET ${setClauses.join(', ')} WHERE id = ?
    `;

    await query(sql, updateValues);

    return await findById(id);
};

export {
    findById,
    findByEmail,
    create,
    comparePassword,
    update,
};