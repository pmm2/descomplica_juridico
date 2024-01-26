CREATE USER myuser WITH PASSWORD 'mypassword';

CREATE DATABASE mydatabase;
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;

/c mydatabase

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  x INT,
  y INT
);

INSERT INTO users (name, email, phone, x, y) VALUES ('Empresa', 'empresa@email.com', '123456789', 0, 0);