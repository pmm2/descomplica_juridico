const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const { calculatePath } = require("./utils");
const { searchUsers, getAllUsers, createUser } = require("./user.js");
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/users", createUser);
app.get("/users", getAllUsers);
app.get("/users/:searchTerm", searchUsers);

app.get("/calculatePath", async (req, res) => {
  try {
    result = await calculatePath(pool, res);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port :${port}`);
});
