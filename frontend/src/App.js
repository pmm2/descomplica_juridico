import UserList from "./components/UsersList";
import MyForm from "./components/form";
import { useState } from "react";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
function App() {
  const [users, setUsers] = useState([]);
  const fetchData = async (searchTerm) => {
    try {
      let endpoint = "http://localhost:3001/users";

      if (searchTerm) {
        endpoint += `/${encodeURIComponent(searchTerm)}`;
      }

      const response = await axios.get(endpoint);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>
        Descomplica Juridico
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <MyForm fetchData={fetchData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <UserList fetchData={fetchData} users={users} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
