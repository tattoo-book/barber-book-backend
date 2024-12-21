--- Criar os schemas ---
-- CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS users;
CREATE SCHEMA IF NOT EXISTS barbers;
CREATE SCHEMA IF NOT EXISTS barber_shops;
CREATE SCHEMA IF NOT EXISTS roles;

--- Tabela de usuários no schema 'users' ---
CREATE TABLE IF NOT EXISTS users.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP 
);

--- Tabela de tatuadores no schema 'barber_shops' ---
CREATE TABLE IF NOT EXISTS barbers.barbers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users.users(id)
);

-- DROP TABLE roles.roles
CREATE TABLE IF NOT EXISTS roles.roles (
	id serial NOT NULL,
	role varchar(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    
    CONSTRAINT pk_roles PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS barber_shops.barber_shops (
	id serial NOT NULL,
	name varchar(200) NOT NULL,
    owner_id integer NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    
    CONSTRAINT pk_barber_shops PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY (owner_id) REFERENCES users.users(id)
);

-- alter tables
--ALTER TABLE users.users ADD COLUMN deleted_at timestamp;
--ALTER TABLE users.users ADD COLUMN roles INTEGER[];
--UPDATE users.users SET roles = ARRAY[2];
--ALTER TABLE users.users ALTER COLUMN roles SET DEFAULT ARRAY[2];
--ALTER TABLE users.users ALTER COLUMN roles SET NOT NULL;

-- inserts
--INSERT INTO roles.roles(id, role) values(1, 'admin'), (2, 'default'), (3, 'barbers')
















