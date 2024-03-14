// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Typography,
//   Paper,
// } from "@mui/material";
// import Navbar from "../../components/Navbar";
// import { useParams } from "react-router-dom";
// import NotificationsIcon from "@mui/icons-material/Notifications";

// export const StudentTask = () => {
//   const { studentId } = useParams();
//   const [tasks, setTasks] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [nearDeadlineCount, setNearDeadlineCount] = useState(0);
//   const [pastDeadlineCount, setPastDeadlineCount] = useState(0);

//   const getToken = () => {
//     return localStorage.getItem("token");
//   };

//   const config = {
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//       "Content-Type": "application/json",
//     },
//   };

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.APP_API_BASE_URL}/student/tasks/${studentId}`,
//         config
//       );
//       setTasks(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const isNearDeadline = (deadline) => {
//     const currentDate = new Date();
//     const deadlineDate = new Date(deadline);

//     const differenceInMs = deadlineDate.getTime() - currentDate.getTime();

//     const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

//     const isNear = differenceInDays <= 2;

//     const isPast = differenceInDays < 0;

//     return { isNear, isPast };
//   };

//   useEffect(() => {
//     const nearDeadline = tasks.reduce((acc, task) => {
//       const { isNear } = isNearDeadline(task.deadline);
//       if (task.pending === "Pending" && isNear) {
//         return acc + 1;
//       }
//       return acc;
//     }, 0);

//     const pastDeadline = tasks.reduce((acc, task) => {
//       const { isPast } = isNearDeadline(task.deadline);
//       if (task.pending === "Pending" && isPast) {
//         return acc + 1;
//       }
//       return acc;
//     }, 0);
//     setPastDeadlineCount(pastDeadline);
//     setNearDeadlineCount(nearDeadline - pastDeadline);
//   }, [tasks]);

//   return (
//     <div>
//       <Navbar />

//       <Typography
//         className="heading2"
//         variant="h4"
//         gutterBottom
//         sx={{ textAlign: "center" }}
//       >
//         TASKS
//       </Typography>
//       <Typography variant="body1" sx={{ textAlign: "center" }}>
//         Number of tasks nearing deadline: {nearDeadlineCount}
//       </Typography>
//       <Typography variant="body1" sx={{ textAlign: "center" }}>
//         Number of tasks past deadline: {pastDeadlineCount}
//       </Typography>
//       <TableContainer component={Paper} className="table">
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>TASK ID</TableCell>
//               <TableCell>TASK NAME</TableCell>
//               <TableCell>STUDENT ID</TableCell>
//               <TableCell>DEADLINE</TableCell>
//               <TableCell>PENDING</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {tasks
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((task) => (
//                 <TableRow key={task.taskId}>
//                   <TableCell>{task.taskId}</TableCell>
//                   <TableCell>{task.taskName}</TableCell>
//                   <TableCell>{task.studentId}</TableCell>
//                   <TableCell>{task.deadline}</TableCell>
//                   <TableCell>{task.pending}</TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={tasks.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </div>
//   );
// };

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
  IconButton,
  Snackbar,
  Box,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "../../assets/css/StudentTasks.css";

export const StudentTask = () => {
  const { studentId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [nearDeadlineCount, setNearDeadlineCount] = useState(0);
  const [pastDeadlineCount, setPastDeadlineCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.APP_API_BASE_URL}/student/tasks/${studentId}`,
        config
      );
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isNearDeadline = (deadline) => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);

    const differenceInMs = deadlineDate.getTime() - currentDate.getTime();

    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

    const isNear = differenceInDays <= 2;

    const isPast = differenceInDays < 0;

    return { isNear, isPast };
  };

  useEffect(() => {
    const nearDeadline = tasks.reduce((acc, task) => {
      const { isNear } = isNearDeadline(task.deadline);
      if (task.pending === "Pending" && isNear) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const pastDeadline = tasks.reduce((acc, task) => {
      const { isPast } = isNearDeadline(task.deadline);
      if (task.pending === "Pending" && isPast) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setPastDeadlineCount(pastDeadline);
    setNearDeadlineCount(nearDeadline - pastDeadline);
    setShowAlert(nearDeadline > 0 || pastDeadline > 0);
  }, [tasks]);

  const handleCloseAlert = () => {
    setShowAlert(false);
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
        TASKS
      </Typography>
      <Box className="alert-box">
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          TASKS NEARING DEADLINE: {nearDeadlineCount}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          TASKS PAST DEADLINE: {pastDeadlineCount}
        </Typography>
      </Box>

      <TableContainer component={Paper} className="table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>TASK ID</TableCell>
              <TableCell>TASK NAME</TableCell>
              <TableCell>STUDENT ID</TableCell>
              <TableCell>DEADLINE</TableCell>
              <TableCell>PENDING</TableCell>
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
                  <TableCell>{task.pending}</TableCell>
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

      <Snackbar
        open={showAlert}
        autoHideDuration={20000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <NotificationsIcon sx={{ mr: 1 }} />
            You have tasks nearing or past the deadline!
          </Typography>
        </Paper>
      </Snackbar>
    </div>
  );
};
