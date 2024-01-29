// Function to create a user
const { Pool } = require("pg");
const pool = new Pool({
  user: "myuser",
  host: "postgres",
  database: "mydatabase",
  password: "mypassword",
  port: 5432,
});
async function createUser(req, res) {
  const { name, email, phone, x, y } = req.body;

  const result = await pool.query(
    "INSERT INTO users (name, email, phone, x, y) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, email, phone, x, y]
  );

  res.json(result.rows[0]);
}

// Function to get all users
async function getAllUsers(req, res) {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
}

// Function to search users
async function searchUsers(req, res) {
  const { searchTerm } = req.params;
  const result = await pool.query(
    "SELECT * FROM users WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1 OR CAST(x AS VARCHAR) ILIKE $1 OR CAST(y AS VARCHAR) ILIKE $1",
    [`%${searchTerm}%`]
  );
  res.json(result.rows);
}
module.exports = {
  pool,
  searchUsers,
  getAllUsers,
  createUser,
};
