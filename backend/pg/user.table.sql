CREATE TYPE user_status AS ENUM ('ACTIVE', 'PENDING', 'BLOCKED');
create TABLE users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    status user_status,
    password VARCHAR(255),
    role VARCHAR(255)
);
