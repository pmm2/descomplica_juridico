import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import axios from "axios";

const UserList = ({ fetchData, users, setUsers }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    // Clear the previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout
    const timeoutId = setTimeout(() => {
      fetchData(searchTerm);
    }, 500); // Adjust the delay (in milliseconds) as needed

    setTypingTimeout(timeoutId);

    // Cleanup on unmount or when searchTerm changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const calculatePath = async () => {
    try {
      const response = await axios.get("http://localhost:3001/calculatePath");
      console.log(response.data.optimalRoute);
      const route = response.data.optimalRoute;

      setModalContent(route);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching calculating path", error.message);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container>
      <TextField
        label="Search"
        variant="outlined"
        margin="normal"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText
              primary={user.name}
              secondary={`Email: ${user.email}, Phone: ${user.phone}, X: ${user.x}, Y: ${user.y}`}
            />
          </ListItem>
        ))}
      </List>

      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: "10px" }}
        onClick={calculatePath}
      >
        Calculate Route
      </Button>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Calculated Route</DialogTitle>
        <DialogContent>
          {modalContent.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserList;
