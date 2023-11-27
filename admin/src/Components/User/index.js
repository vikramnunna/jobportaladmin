import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import { Col, Row } from "react-bootstrap";
import PeopleIcon from "@mui/icons-material/People";
import VisibilityIcon from "@mui/icons-material/Visibility";

import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { getApihandler } from "../../API_Handler";

const columns = [
  { id: "Sr no.", label: "Sr no." },
  {
    id: "Name",
    label: "Name",
  },
  {
    id: "Email Address",
    label: "Email Address",
  },
  {
    id: "Mobile",
    label: "Mobile",
  },
  
];

export default function User() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [flag, setFlag] = useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    getUserAll();
  }, []);

  useEffect(() => {
    if (flag !== 0) {
      deleteFlag();
    }
  }, [flag]);

  const deleteFlag = async () => {
    let item = {
      deleteFlag: flag,
    };
    // console.log("item=>", item);
    // const response = await putApihandler(
    //   `/deActivateUserAccount/${userId}`,
    //   item
    // );
    // console.log("response===========>", response);

    // getUserAll();
  };

  const getUserAll = async () => {
    const response = await getApihandler("/getAllUser");
    // console.log("getAllUser===>", response.data);
    if (response.status === 200) {
      setData(response.data);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <AdminLayout>
      <Box sx={{ flexGrow: 1 }} className="my-5">
        <Row className="align-items-center mb-4">
          <Col xs={12}>
            <Row className="align-items-center mb-2">
              <Col xs={12}>
                <div className="page_title_wrapper d-flex align-items-center justify-content-center mb-2">
                  <IconButton>
                    <PeopleIcon style={{ color: "#3091F9" }} fontSize="large" />
                  </IconButton>
                  <h1 className="page_title m-0 ps-0">Users</h1>
                </div>
              </Col>
            </Row>
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
                {data !== undefined &&
                  data !== null &&
                  data.map((val, ind) => {
                    return (
                      <TableRow key={ind}>
                        <TableCell
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {ind + 1}.
                        </TableCell>
                        <TableCell>{val.name}</TableCell>
                        <TableCell>{val.userEmail}</TableCell>
                        <TableCell>+91{val.phone_number}</TableCell>
                       
                      </TableRow>
                    );
                  })}
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
