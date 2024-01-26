const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 3001;

const pool = new Pool({
  user: "myuser",
  host: "postgres",
  database: "mydatabase",
  password: "mypassword",
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

// Create a user
app.post("/users", async (req, res) => {
  const { name, email, phone, x, y } = req.body;

  const result = await pool.query(
    "INSERT INTO users (name, email, phone, x, y) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, email, phone, x, y]
  );

  res.json(result.rows[0]);
});

// Get all users
app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

//Search users
app.get("/users/:searchTerm", async (req, res) => {
  const { searchTerm } = req.params;
  const result = await pool.query(
    "SELECT * FROM users WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1 OR CAST(x AS VARCHAR) ILIKE $1 OR CAST(y AS VARCHAR) ILIKE $1",
    [`%${searchTerm}%`]
  );
  res.json(result.rows);
});
//Calculate best path between all users using TSP
app.get("/calculatePath", async (req, res) => {
  try {
    const query = await pool.query("SELECT * FROM users");
    const clients = query.rows;
    const optimalRoute = solveTSP(clients);

    const totalDistance = calculateTotalDistance(
      optimalRoute.map((client) => clients.indexOf(client)),
      clients
    );
    const index = optimalRoute.findIndex(
      (item) => item.name === "Empresa" && item.x == 0 && item.y == 0
    );

    if (index !== -1) {
      const newArray = [
        optimalRoute[index],
        ...optimalRoute.slice(0, index),
        ...optimalRoute.slice(index + 1),
      ];

      console.log(newArray);
      res.json({ optimalRoute: newArray, totalDistance });
    } else {
      console.log("Company not found in the array");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//UTILS

// Function to calculate the distance between two points (cities)
function calculateDistance(point1, point2) {
  const xDiff = point1.x - point2.x;
  const yDiff = point1.y - point2.y;
  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

// Function to calculate the total distance of a route
function calculateTotalDistance(route, cities) {
  let totalDistance = 0;
  for (let i = 0; i < route.length - 1; i++) {
    const city1 = cities[route[i]];
    const city2 = cities[route[i + 1]];
    totalDistance += calculateDistance(city1, city2);
  }
  return totalDistance;
}

// Function to generate all possible permutations of an array
function generatePermutations(arr) {
  if (arr.length === 1) {
    return [arr];
  }

  const permutations = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const restPermutations = generatePermutations(rest);
    for (const permutation of restPermutations) {
      permutations.push([arr[i], ...permutation]);
    }
  }

  return permutations;
}

// Function to solve the TSP using brute-force approach
function solveTSP(cities) {
  const numCities = cities.length;
  const cityIndices = [...Array(numCities).keys()];

  // Generate all possible routes
  const allRoutes = generatePermutations(cityIndices);

  // Find the route with the minimum total distance
  let minDistance = Infinity;
  let minRoute;
  for (const route of allRoutes) {
    const distance = calculateTotalDistance(route, cities);
    if (distance < minDistance) {
      minDistance = distance;
      minRoute = route;
    }
  }

  return minRoute.map((index) => cities[index]);
}
