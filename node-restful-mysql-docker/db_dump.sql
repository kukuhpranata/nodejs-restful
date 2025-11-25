INSERT INTO users (
        id,
        name,
        email,
        password,
        created_at,
        updated_at
    )
VALUES (
        id :int,
        'name:varchar',
        'email:varchar',
        'password:varchar',
        'created_at:timestamp',
        'updated_at:timestamp'
    );
-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    -- Primary Key: Automatically increments
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- User details
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    -- Email must be unique
    -- Password storage: Use VARCHAR(255) or more for bcrypt hashes
    password VARCHAR(255) NOT NULL,
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Insert 5 dummy users for testing.
-- Password '12345678' is hashed using the SHA256 simulation matching user.model.js:
-- Hash: ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f
INSERT INTO users (name, email, password)
VALUES (
        'User Alpha',
        'alpha@example.com',
        'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f'
    ),
    (
        'User Bravo',
        'bravo@example.com',
        'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f'
    ),
    (
        'User Charlie',
        'charlie@example.com',
        'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f'
    ),
    (
        'User Delta',
        'delta@example.com',
        'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f'
    ),
    (
        'User Echo',
        'echo@example.com',
        'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f'
    );