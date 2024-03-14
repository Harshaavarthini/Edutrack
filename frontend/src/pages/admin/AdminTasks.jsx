import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  DialogActions,
  Alert,
  FormControl,
  InputLabel,
  Box,
  Input,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { useForm } from "react-hook-form";
import "../../assets/css/AdminTasks.css";

export const AdminTasks = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [searchFilters, setSearchFilters] = useState({
    studentId: "",
    taskName: "",
    studentName: "",
    pending: "",
    deadline: "",
  });

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  };

  const fetAllTask = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.APP_API_BASE_URL}/admin/getalltasks`,
        config
      );
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetAllTask();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAdd = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    reset();
    setOpenDialog(false);
  };

  const handleAddTask = async (data) => {
    //console.log(data);
    try {
      await axios.post(
        `${import.meta.env.APP_API_BASE_URL}/admin/assigntask`,
        data,
        config
      );

      setOpenDialog(false);
      showAlert("Task assigned successfully", "success");

      fetAllTask();
      reset();
    } catch (error) {
      console.log(error);
      showAlert("Error Assigning Task", "error");
    }
  };

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.APP_API_BASE_URL}/admin/delete/${taskId}`,
        config
      );
      fetAllTask();
      showAlert("deleted task successfully", "success");
    } catch (error) {
      console.log(error);
      showAlert("Deletion failed", "error");
    }
  };
  const isFutureDate = (selectedDate) => {
    const currentDate = new Date();
    const selected = new Date(selectedDate);
    return selected > currentDate;
  };

  const handleSearch = () => {
    let filteredResults = [...tasks];

    Object.keys(searchFilters).forEach((key) => {
      if (searchFilters[key]) {
        filteredResults = filteredResults.filter(
          (task) => task[key] === searchFilters[key]
        );
      }
    });

    setFilteredTasks(filteredResults);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${import.meta.env.APP_API_BASE_URL}/admin/uploadFile`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        fetAllTask();
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <Button
        className="buttons"
        onClick={handleAdd}
        variant="contained"
        color="info"
        sx={{ m: 2 }}
      >
        Add Task
      </Button>

      <Box>
        <Input
          type="file"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="upload-file"
        />
        <label htmlFor="upload-file">
          <Button
            component="span"
            variant="contained"
            color="primary"
            onClick={(event) => event.stopPropagation()}
          >
            Upload File
          </Button>
        </label>
      </Box>

      {/* <Box sx={{ display: "flex", flexDirection: "column", m: 2 }}>
        <Typography sx={{ textAlign: "left", mb: 1 }}>Filters:</Typography>
        <TextField
          id="taskName"
          name="taskName"
          label="Task Name"
          variant="outlined"
          size="small"
          value={searchFilters.taskName}
          onChange={handleFormChange}
          sx={{ mb: 1 }}
        />
        <TextField
          id="studentName"
          name="studentName"
          label="Student Name"
          variant="outlined"
          size="small"
          value={searchFilters.studentName}
          onChange={handleFormChange}
          sx={{ mb: 1 }}
        />
        <TextField
          id="studentId"
          name="studentId"
          label="Student ID"
          variant="outlined"
          size="small"
          value={searchFilters.studentId}
          onChange={handleFormChange}
          sx={{ mb: 1 }}
        />
        <FormControl fullWidth sx={{ mb: 1 }}>
          <InputLabel id="pending-label">Status</InputLabel>
          <Select
            labelId="pending-label"
            id="pending"
            name="pending"
            value={searchFilters.pending}
            onChange={handleFormChange}
            label="Pending"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="deadline"
          name="deadline"
          label="Deadline"
          variant="outlined"
          size="small"
          type="date"
          value={searchFilters.deadline}
          onChange={handleFormChange}
          sx={{ mb: 1 }}
        />
        <Button
          variant="contained"
          color="info"
          onClick={handleSearch}
          sx={{ mt: 1 }}
        >
          Apply Filters
        </Button>
      </Box> */}
      <Box className="filter-big-box">
        {/* <Typography sx={{ textAlign: "center" }}>Filters:</Typography> */}
        <Box className="filterbox">
          <TextField
            id="taskName"
            name="taskName"
            label="Task Name"
            variant="outlined"
            size="small"
            value={searchFilters.taskName}
            onChange={handleFormChange}
            sx={{ mb: 1 }}
          />
          <TextField
            id="studentName"
            name="studentName"
            label="Student Name"
            variant="outlined"
            size="small"
            value={searchFilters.studentName}
            onChange={handleFormChange}
            sx={{ mb: 1 }}
          />
          <TextField
            id="studentId"
            name="studentId"
            label="Student ID"
            variant="outlined"
            size="small"
            value={searchFilters.studentId}
            onChange={handleFormChange}
            sx={{ mb: 1 }}
          />
        </Box>
        <Box className="filterbox">
          <FormControl sx={{ mb: 1 }}>
            <InputLabel id="pending-label">Status</InputLabel>
            <Select
              labelId="pending-label"
              id="pending"
              name="pending"
              value={searchFilters.pending}
              onChange={handleFormChange}
              label="Pending"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="deadline"
            name="deadline"
            label="Deadline"
            variant="outlined"
            size="small"
            type="date"
            value={searchFilters.deadline}
            onChange={handleFormChange}
            sx={{ mb: 1 }}
          />
          <Button variant="contained" color="info" onClick={handleSearch}>
            Apply Filters
          </Button>
        </Box>
      </Box>

      <Typography sx={{ textAlign: "center" }} variant="h4" gutterBottom>
        TASKS
      </Typography>
      <TableContainer component={Paper} className="table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task ID</TableCell>
              <TableCell>Task Name</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Student ID</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((task) => (
                <TableRow key={task.taskId}>
                  <TableCell>{task.taskId}</TableCell>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>{task.studentName}</TableCell>
                  <TableCell>{task.studentId}</TableCell>
                  <TableCell>{task.deadline}</TableCell>
                  <TableCell>{task.pending}</TableCell>
                  <TableCell>
                    {
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => handleDelete(task.taskId)}
                      >
                        Delete
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(handleAddTask),
        }}
        // sx={{ height: "60%", width: "50%" }}
      >
        <DialogTitle>ADD TASK</DialogTitle>
        <DialogContent>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              autoFocus
              required
              id="taskName"
              name="taskName"
              label="Task Name"
              fullWidth
              variant="outlined"
              size="small"
              {...register("taskName", {
                required: "taskname is required",
                minLength: 2,
                maxLength: 30,
              })}
              //inputRef={register}
            />
            {errors.taskName?.type === "required" && (
              <p style={{ color: "red" }}>*{errors.taskName.message}</p>
            )}
            {errors.taskName?.type === "minLength" && (
              <p style={{ color: "red" }}>
                Student name should have a minimum length of 2
              </p>
            )}
            {errors.taskName?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                Student name should have a maximum length of 30
              </p>
            )}
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              autoFocus
              required
              id="studentName"
              name="studentName"
              label="Student Name"
              fullWidth
              variant="outlined"
              size="small"
              {...register("studentName", {
                required: "Student name is required",
                maxLength: 30,
                minLength: 2,
              })}
            />
            {errors.studentName?.type === "minLength" && (
              <p style={{ color: "red" }}>
                Student name should have a minimum length of 2
              </p>
            )}
            {errors.studentName?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                Student name should have a maximum length of 30
              </p>
            )}
            {errors.studentName?.type === "required" && (
              <p style={{ color: "red" }}>{errors.studentName.message}</p>
            )}
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              autoFocus
              required
              id="studentId"
              name="studentId"
              label="Student ID"
              fullWidth
              variant="outlined"
              size="small"
              {...register("studentId", {
                required: "Student  ID is required",
                minLength: 4,
                maxLength: 4,
              })}
            />
            {errors.studentId?.type === "required" && (
              <p style={{ color: "red" }}>*{errors.studentId.message}</p>
            )}
            {errors.studentId?.type === "minLength" && (
              <p style={{ color: "red" }}>
                *Student ID should have a length of 4
              </p>
            )}
            {errors.studentId?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                *Student ID should have a length of 4
              </p>
            )}
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="pending-label">Status</InputLabel>
            </FormControl>
            <Select
              required
              labelId="pending-label"
              id="pending"
              name="pending"
              label="Pending"
              fullWidth
              variant="outlined"
              size="small"
              {...register("pending")}
              defaultValue="Pending"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              autoFocus
              required
              id="deadline"
              name="deadline"
              label="Deadline"
              fullWidth
              variant="outlined"
              size="small"
              type="date"
              {...register("deadline", {
                validate: {
                  pastDate: (value) => isFutureDate(value),
                },
              })}
            />
            {errors.deadline?.type === "pastDate" && (
              <p style={{ color: "red" }}>Deadline should be in the future</p>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="warning">
            Cancel
          </Button>
          <Button variant="contained" color="info" type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {alertMessage && (
        <Alert
          variant="filled"
          severity={alertSeverity}
          onClose={() => setAlertMessage(null)}
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "25%",
            height: "auto",
            maxHeight: "200px",
            overflow: "auto",
            padding: "10px",
            zIndex: 9999,
          }}
        >
          {alertMessage}
        </Alert>
      )}
    </div>
  );
};
