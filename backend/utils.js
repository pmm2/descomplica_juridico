const { pool } = require("./user.js");
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
const calculatePath = async () => {
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
    return { optimalRoute: newArray, totalDistance };
  } else {
    console.log("Company not found in the array");
  }
};
module.exports = {
  calculatePath,
  solveTSP,
};
