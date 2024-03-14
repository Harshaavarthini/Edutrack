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
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export const AdminHome = () => {
  const [students, setStudents] = useState([]);
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

  const fetAllStudents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.APP_API_BASE_URL}/admin/getallstudents`,
        config
      );
      setStudents(response.data);
      //console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetAllStudents();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Navbar />

      <Typography
        className="heading2"
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        STUDENTS
      </Typography>
      <TableContainer component={Paper} className="table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Date Of Birth</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Tasks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student) => (
                <TableRow
                  key={student.id}
                  //   onClick={() => handleCenterClick(student)}
                >
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.dob}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    {
                      <Button
                        sx={{ mx: "1rem" }}
                        color="info"
                        variant="contained"
                        component={Link}
                        to={`/student/${student.id}`}
                      >
                        View Tasks
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
        count={students.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
