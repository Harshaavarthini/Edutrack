import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [notification, setNotification] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(
        `${import.meta.env.APP_API_BASE_URL}/auth/register`,
        data
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        const info = jwtDecode(localStorage.getItem("token"));
        localStorage.setItem("username", info.username);
        localStorage.setItem("useremail", info.sub);
        localStorage.setItem("studentId", info.id);

        {
          info.role === "STUDENT"
            ? localStorage.setItem("isAdmin", false)
            : localStorage.setItem("isAdmin", true);
        }
        if (info.role == "STUDENT") {
          console.log(localStorage.getItem("studentId"));
          navigate(`/student/${localStorage.getItem("studentId")}`);
        } else {
          navigate("/admin");
        }
      } else {
        console.error("Token not found in response.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setIsError(true);
    }
  };

  const isFutureDate = (selectedDate) => {
    const currentDate = new Date();
    const selected = new Date(selectedDate);
    return selected > currentDate;
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url("https://previews.123rf.com/images/artursz/artursz2004/artursz200424135/144866183-writing-note-showing-my-tasks-business-concept-for-assigned-piece-of-work-often-to-be-finished.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: 0,
      }}
    >
      <div style={{ margin: "4rem" }}>
        <Typography variant="h1" sx={{ color: "black" }}>
          TASK-TRACKER
        </Typography>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: 600,
            maxWidth: 600,
          }}
        >
          {notification && (
            <div className="notification" style={{ color: "green" }}>
              <p>{notification}</p>
            </div>
          )}
          <Typography variant="h4" gutterBottom>
            SignUp
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Name"
                variant="outlined"
                size="small"
                fullWidth
                {...register("name", {
                  required: "Name is required",
                  minLength: 4,
                })}
              />
              {errors.name?.type === "required" && (
                <p style={{ color: "red" }}>*{errors.name.message}</p>
              )}
              {errors.name?.type === "minLength" && (
                <p style={{ color: "red" }}>
                  *Username should be atleast 4 letters
                </p>
              )}
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Student ID"
                variant="outlined"
                size="small"
                fullWidth
                {...register("id", {
                  required: "Student ID is required",
                  minLength: 3,
                  maxLength: 10,
                })}
                helperText="Please enter the correct ID"
              />
              {errors.id?.type === "required" && (
                <p style={{ color: "red" }}>*{errors.id.message}</p>
              )}
              {errors.id?.type === "minLength" && (
                <p style={{ color: "red" }}>
                  Student Id should be atleast 3 letters
                </p>
              )}
              {errors.id?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  Student Id should be max of 10 letters
                </p>
              )}
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="email"
                variant="outlined"
                size="small"
                fullWidth
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid",
                  },
                })}
              />
              {errors.email?.type === "required" && (
                <p style={{ color: "red" }}>*{errors.email.message}</p>
              )}
              {errors.email?.type === "pattern" && (
                <p style={{ color: "red" }}>*{errors.email.message}</p>
              )}
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Date of Birth"
                variant="outlined"
                size="small"
                type="date"
                fullWidth
                {...register("dob", {
                  required: "Date of Birth is required",
                  validate: {
                    futureDate: (value) => !isFutureDate(value),
                  },
                })}
                InputLabelProps={{ shrink: true }}
              />
              {errors.dob?.type === "required" && (
                <p style={{ color: "red" }}>*{errors.dob.message}</p>
              )}
              {errors.dob?.type === "futureDate" && (
                <p style={{ color: "red" }}>
                  Date of Birth should not be in the future
                </p>
              )}
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <InputLabel>Department</InputLabel>
              <Select
                label="Department"
                variant="outlined"
                size="small"
                fullWidth
                {...register("department", {
                  required: "Department is required",
                })}
              >
                <MenuItem value="">Department</MenuItem>
                <MenuItem value="CSE">CSE</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="AIDS">AIDS</MenuItem>
                <MenuItem value="ECE">ECE</MenuItem>
                <MenuItem value="EEE">EEE</MenuItem>
                <MenuItem value="MECH">MECH</MenuItem>
              </Select>
              {errors.department?.type === "required" && (
                <p style={{ color: "red" }}>*{errors.department.message}</p>
              )}
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                size="small"
                fullWidth
                {...register("password", {
                  required: "Password is required",
                  validate: {
                    checkLength: (value) => value.length >= 6,
                    matchPattern: (value) =>
                      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                        value
                      ),
                  },
                })}
              />
              {errors.password?.type === "required" && (
                <p style={{ color: "red" }}>Password is required.</p>
              )}
              {errors.password?.type === "checkLength" && (
                <p style={{ color: "red" }}>
                  Password should be at-least 6 characters.
                </p>
              )}
              {errors.password?.type === "matchPattern" && (
                <p style={{ color: "red" }}>
                  Password should contain at least one uppercase letter,
                  lowercase letter, digit, and special symbol.
                </p>
              )}
            </Box>
            <Button variant="contained" size="large" fullWidth type="submit">
              Register
            </Button>
          </form>
          {isError && (
            <p style={{ color: "red" }}>
              The email provided is already registered!
            </p>
          )}
          <p>
            Already an user? <Link to="/login">Click here</Link>
          </p>
        </Paper>
      </Box>
    </div>
  );
};
