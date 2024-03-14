import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
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
} from "@mui/material";

export const Pending = () => {
  const studentId = localStorage.getItem("studentId");

  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  };

  const fetAllPending = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.APP_API_BASE_URL}/student/pending/${studentId}`,
        config
      );
      setTasks(response.data);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetAllPending();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const updatePending = async (taskId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.APP_API_BASE_URL}/student/update/${taskId}`,
        null,
        config
      );
      fetAllPending();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />

      <Typography
        className="heading2"
        sx={{ textAlign: "center" }}
        variant="h4"
        gutterBottom
      >
        TASKS
      </Typography>
      <TableContainer component={Paper} className="table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task ID</TableCell>
              <TableCell>Task Name</TableCell>
              <TableCell>Student ID</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Pending</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks

              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((task) => (
                <TableRow key={task.taskId}>
                  <TableCell>{task.taskId}</TableCell>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>{task.studentId}</TableCell>
                  <TableCell>{task.deadline}</TableCell>
                  <TableCell>
                    {
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => updatePending(task.taskId)}
                      >
                        Mark as Complete
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
    </div>
  );
};
