import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import { Col, Row } from "react-bootstrap";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Link, useFormAction } from "react-router-dom";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useForm } from "react-hook-form";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import WorkIcon from "@mui/icons-material/Work";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  deleteApihandler,
  getApihandler,
  postApihandler,
  putApihandler,
} from "../../API_Handler";
import swal from "sweetalert";

const columns = [
  { id: "Id", label: "Id", minWidth: 50 },
  {
    id: "job-title",
    label: "Job Title",
    minWidth: 150,
  },
  {
    id: "category",
    minWidth: 150,
    label: "Category",
  },

  {
    id: "sub-category",
    minWidth: 150,
    label: "Sub-Category",
  },
  {
    id: "salary-range",
    minWidth: 150,
    label: "Salary Range",
  },
  {
    id: "job-type",
    minWidth: 150,
    label: "Job Type",
  },
  {
    minWidth: 150,
    id: "location",
    label: "Location",
  },
  {
    id: "desctiption",
    minWidth: 150,
    label: "Desctiption",
  },
  {
    id: "actions",
    minWidth: 250,
    label: "Actions",
  },
];

export default function SubCategory() {
  const [data, setData] = useState([]);
  console.log("data--->", data);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // UseEffect

  useEffect(() => {
    getJobs();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // API's Function
  const getJobs = async () => {
    const response = await getApihandler("/getJobList/All");
    console.log("res---->", response);
    setData(response.data);
  };

  const deleteProperty = (index) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteData(index);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const deleteData = async (index) => {
    const { _id } = data[index];
    // console.log("id=>", _id);
    const deleteres = await deleteApihandler("/deleteJob/", _id);
    // console.log("data=>", deleteres);
    if (deleteres.status === 403) {
      swal(
        "Can't delete",
        "Model details cannot be deleted because it has models with it"
      );
    } else {
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
      getJobs();
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ flexGrow: 1 }} className="my-5">
        <Row className="align-items-center mb-4">
          <Col xs={12}>
            <div className="page_title_wrapper d-flex align-items-center justify-content-center mb-2">
              <IconButton>
                <WorkIcon style={{ color: "#3091F9" }} fontSize="large" />
              </IconButton>
              <h1 className="page_title m-0 ps-0">Jobs</h1>
            </div>
          </Col>
          <Col>
            <div className="add-Category text-start">
              <Link to="/add-job">
                <Button
                  variant="contained"
                  style={{
                    fontWeight: "600",
                    backgroundColor: "#3091F9",
                  }}
                >
                  Add Job
                  <AddCircleRoundedIcon
                    sx={{
                      borderRadius: "50%",
                      fontSize: "30px",
                      marginLeft: "5px",
                    }}
                  />
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "#3091F9",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length !== 0 ? (
                  data.map((val, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          {val.title}
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          {val.category}
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          {val.subCategory}
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          {val.salaryRange}
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          {val.jobType}
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          {val.jobLocation}
                        </TableCell>

                        <TableCell style={{ fontWeight: "bold" }}>
                          {val.description}
                        </TableCell>

                        <TableCell>
                          <IconButton>
                            <Link to={`/edit-job/${val._id}`}>
                              <ModeEditOutlineRoundedIcon
                                sx={{
                                  backgroundColor: "#000",
                                  color: "#fff",
                                  borderRadius: "50%",
                                  padding: "6px",
                                  fontSize: "35px",
                                  cursor: "pointer",
                                }}
                              />
                            </Link>
                          </IconButton>
                          <IconButton
                            sx={{
                              marginLeft: "15px",
                            }}
                          >
                            <Link to="#">
                              <VisibilityIcon
                                sx={{
                                  backgroundColor: "#000",
                                  color: "#fff",
                                  borderRadius: "50%",
                                  padding: "6px",
                                  fontSize: "35px",
                                  cursor: "pointer",
                                }}
                              />
                            </Link>
                          </IconButton>
                          <IconButton
                            sx={{
                              marginLeft: "15px",
                            }}
                            onClick={() => {
                              deleteProperty(index);
                            }}
                          >
                            <DeleteForeverRoundedIcon
                              // fontSize="large"
                              sx={{
                                backgroundColor: "#000",
                                color: "#fff",
                                borderRadius: "50%",
                                padding: "6px",
                                fontSize: "35px",
                                cursor: "pointer",
                              }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <h3>No data</h3>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </AdminLayout>
  );
}
