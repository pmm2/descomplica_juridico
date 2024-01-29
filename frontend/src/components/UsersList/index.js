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

const UserList = ({ fetchData, users, API_URL }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const timeToFetch = 500;
    const timeoutId = setTimeout(() => {
      fetchData(searchTerm);
    }, timeToFetch);

    setTypingTimeout(timeoutId);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const calculatePath = async () => {
    try {
      console.log(`${API_URL}/calculatePath`);
      const response = await axios.get(`${API_URL}/calculatePath`);
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
