import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import Navbar from "./Navbar";

const AccountsPage = () => {
  const [account, setAccount] = useState();
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  };

  const fetchAccount = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.APP_API_BASE_URL
        }/student/profile/${localStorage.getItem("studentId")}`,
        config
      );
      setAccount(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <div>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Accounts
        </Typography>
        <Paper
          elevation={3}
          sx={{ p: 3, mt: 3, border: 8, borderColor: "#db7dc2" }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputLabel>Student ID</InputLabel>
              <TextField
                //   label="ID"
                variant="outlined"
                fullWidth
                disabled
                value={account && account.id}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Student Name</InputLabel>
              <TextField
                //   label="Name"
                variant="outlined"
                fullWidth
                value={account && account.name}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Email</InputLabel>
              <TextField
                //   label="Email"
                variant="outlined"
                fullWidth
                value={account && account.email}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Department</InputLabel>
              <TextField
                //   label="Department"
                variant="outlined"
                fullWidth
                value={account && account.department}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Date of Birth</InputLabel>
              <TextField
                //   label="Date of Birth"
                variant="outlined"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                value={account && account.dob}
                disabled
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default AccountsPage;
