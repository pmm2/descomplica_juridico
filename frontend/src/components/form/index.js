import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Stack, Container } from "@mui/material";

const MyForm = ({ fetchData, API_URL }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    x: "",
    y: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/users`, formData);
      console.log("User added successfully:", response.data);

      setFormData({
        name: "",
        email: "",
        phone: "",
        x: "",
        y: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            required
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            required
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            required
            fullWidth
            label="Telephone"
            variant="outlined"
            margin="normal"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <TextField
            required
            fullWidth
            label="X"
            variant="outlined"
            margin="normal"
            name="x"
            value={formData.x}
            onChange={handleInputChange}
          />
          <TextField
            required
            fullWidth
            label="Y"
            variant="outlined"
            margin="normal"
            name="y"
            value={formData.y}
            onChange={handleInputChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default MyForm;
