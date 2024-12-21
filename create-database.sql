-- Criar os schemas
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS users;
CREATE SCHEMA IF NOT EXISTS tattoo_artists;
CREATE SCHEMA IF NOT EXISTS studios;

-- Tabela de usuários no schema 'users'
CREATE TABLE IF NOT EXISTS users.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP 
);

-- Tabela de estúdios no schema 'studios'
CREATE TABLE IF NOT EXISTS studios.studios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);


-- Tabela de tatuadores no schema 'studios'
CREATE TABLE IF NOT EXISTS tattoo_artists.tattoo_artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    studio_id INT NOT NULL REFERENCES studios.studios(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);


-- Relacionamento entre usuários e estúdios (opcional)
-- Adiciona uma coluna no esquema 'auth' para indicar a associação de um usuário ao seu estúdio (caso aplicável)
CREATE TABLE IF NOT EXISTS auth.user_studios (
    user_id INT NOT NULL REFERENCES users.users(id),
    studio_id INT NOT NULL REFERENCES studios.studios(id),
    role VARCHAR(50) NOT NULL, -- Exemplo: "admin", "manager"
    PRIMARY KEY (user_id, studio_id)
);



ALTER TABLE users.users ADD COLUMN deleted_at timestamp;








