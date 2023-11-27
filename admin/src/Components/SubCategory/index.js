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
import { useFormAction } from "react-router-dom";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useForm } from "react-hook-form";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
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
    id: "sub-category",
    label: "Sub Category Name",
  },
  {
    id: "category",
    label: "Parent Category Name",
  },
  {
    id: "actions",
    label: "Actions",
  },
];

export default function SubCategory() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [flag, setFlag] = useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [CategoryData, setCategoryData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [categoryId, setcategoryId] = useState();
  var FormData = require("form-data");
  const [SubCategoryData, setSubCategoryData] = useState([]);
  // console.log("sub category add from this id - ", categoryId);
  const [subCategoryId, setSubCategoryId] = useState();
  const [editsubCategoryName, setEditsubCategoryName] = useState();
  const [editsubCategoryId, setEditsubCategoryId] = useState();
  const [addData, setAddData] = useState(false);
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [ind, setInd] = useState("");

  useEffect(() => {
    getSubCategory();
    getCategory();
  }, []);

  useEffect(() => {
    if (ind !== "") {
      let { subCategory } = SubCategoryData[ind];
      setValue("subCategory", subCategory);
    }
  }, [subCategoryId]);

  // Model Actions
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddData(false);
  };

  // Model Style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "10PX",
    boxShadow: 24,
    padding: 3,
  };

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
    // const response = await getApihandler("/getAllUser/All");
    // console.log("getAllUser===>", response.data);
    // setData(response.data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // API's Function

  const getCategory = async () => {
    let result = await getApihandler("/getCategory/All");
    setCategoryData(result.data);
    // console.log(" get result is - ", result.data);
  };

  const getSubCategory = async () => {
    let result = await getApihandler("/getSubCategory/All");
    setSubCategoryData(result.data);
    console.log(" get sub category result is - ", result.data);
  };

  const deleteSubCategory = async (val) => {
    let result = await deleteApihandler(`/deleteSubCategory/`, val);
    // console.log("Delete Subcategory Resp", result);
    if (result.status == 200) {
      swal("Poof! Your sub-category has been deleted!", {
        icon: "success",
      });
    } else {
      swal(`${result.error.response.data.message}`, {
        icon: "error",
      });
    }
    getSubCategory();
  };

  const submitSubCategory = async (value) => {
    const result = await postApihandler(`/addSubCategory/${categoryId}`, value);
    // console.log("subcat post - ", result);
    if (result.status === 200) {
      handleClose();
      getSubCategory();
      swal({
        title: "Congratulations!",
        text: "New Sub-Category Has Added!",
        icon: "success",
        button: "Done!",
      });
    } else {
      let Response = `${result.error.response.data.message}`;
      const finalSentence = Response.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      );
      swal("Sorry!", `${finalSentence}, Please Try Again!`, "error");
      handleClose();
      getCategory();
    }
  };

  const UpdateData = async (value) => {
    const result = await putApihandler(
      `/updateSubCategory/${subCategoryId}`,
      value
    );
    if (result.status === 200) {
      handleClose();
      getSubCategory();
      swal({
        title: "Congratulations!",
        text: "Sub-Category Has Updated!",
        icon: "success",
        button: "Done!",
      });
    } else {
      let Response = `${result.error.response.data.message}`;
      const finalSentence = Response.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      );
      swal("Sorry!", `${finalSentence}, Please Try Again!`, "error");
      handleClose();
      getCategory();
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ flexGrow: 1 }} className="my-5">
        <Row className="align-items-center mb-4">
          <Col xs={12}>
            <div className="page_title_wrapper d-flex align-items-center justify-content-center mb-2">
              <IconButton>
                <CategoryIcon style={{ color: "#3091F9" }} fontSize="large" />
              </IconButton>
              <h1 className="page_title m-0 ps-0">Sub-Category</h1>
            </div>
          </Col>
          <Col>
            <div className="add-Category text-start">
              <Button
                variant="contained"
                style={{
                  fontWeight: "600",
                  backgroundColor: "#3091F9",
                }}
                onClick={() => {
                  handleOpen();
                  setAddData(true);
                  setValue("subCategory", "");
                  setcategoryId("");
                }}
              >
                Add Sub-Category
                <AddCircleRoundedIcon
                  sx={{
                    borderRadius: "50%",
                    fontSize: "30px",
                    marginLeft: "5px",
                  }}
                />
              </Button>
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
                {SubCategoryData !== null &&
                  SubCategoryData !== undefined &&
                  SubCategoryData.map((val, ind) => {
                    return (
                      <TableRow key={ind}>
                        <TableCell
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {ind + 1}.
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          {val.subCategory}
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          {val.categoryName}
                        </TableCell>

                        <TableCell>
                          <IconButton
                            onClick={() => {
                              setSubCategoryId(val._id);
                              handleOpen();
                              setInd(ind);
                              setEditsubCategoryName(val.categoryName);
                              setEditsubCategoryId(val.categoryId);
                              // console.log("User Id is - ", val._id);
                            }}
                          >
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
                          </IconButton>
                          <IconButton
                            sx={{
                              marginLeft: "15px",
                            }}
                            onClick={() =>
                              swal({
                                title: "Are you sure?",
                                text: "Once deleted, you will not be able to recover this data!",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              }).then((willDelete) => {
                                if (willDelete) {
                                  deleteSubCategory(val._id);
                                } else {
                                  swal("Your data file is safe!", {
                                    icon: "success",
                                  });
                                }
                              })
                            }
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

      {/* Add Model Code */}
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="d-flex align-items-center justify-content-start">
              {addData ? (
                <IconButton>
                  <AddCircleRoundedIcon
                    style={{ color: "#3091F9" }}
                    fontSize="large"
                  />
                </IconButton>
              ) : (
                <IconButton>
                  <ChangeCircleIcon
                    style={{ color: "#3091F9" }}
                    fontSize="large"
                  />
                </IconButton>
              )}
              <Typography component="h1" variant="h5">
                Sub-Category
              </Typography>
            </div>
            <Box
              component="form"
              onSubmit={
                addData
                  ? handleSubmit(submitSubCategory)
                  : handleSubmit(UpdateData)
              }
              noValidate
              sx={{ mt: 1 }}
            >
              <select
                borderRadius="14px"
                fontSize="16px"
                placeholder="Select Category..."
                style={{
                  padding: "10px",
                  width: "100%",
                }}
                onChange={(e) => setcategoryId(e.target.value)}
              >
                <option value="null">Select Category...</option>
                <option value={1}>1</option>
              </select>
              <TextField
                margin="normal"
                required
                fullWidth
                id="subCategoryName"
                label="Sub-Category Name"
                name="subCategory"
                {...register("subCategory")}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="bg-yellow-ping-grad font-bold"
                sx={{ mt: 3, mb: 2 }}
              >
                {addData ? "Add" : "Update"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal> */}

      {/* Add Model Code */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="d-flex align-items-center justify-content-start">
              {addData ? (
                <IconButton>
                  <AddCircleRoundedIcon
                    style={{ color: "#3091F9" }}
                    fontSize="large"
                  />
                </IconButton>
              ) : (
                <IconButton>
                  <ChangeCircleIcon
                    style={{ color: "#3091F9" }}
                    fontSize="large"
                  />
                </IconButton>
              )}
              <Typography component="h1" variant="h5">
                Sub-Category
              </Typography>
            </div>
            <Box
              component="form"
              onSubmit={
                addData
                  ? handleSubmit(submitSubCategory)
                  : handleSubmit(UpdateData)
              }
              noValidate
              sx={{ mt: 1 }}
            >
              <select
                borderRadius="14px"
                fontSize="16px"
                placeholder="Select Category..."
                style={{
                  padding: "10px",
                  width: "100%",
                }}
                onChange={(e) => setcategoryId(e.target.value)}
              >
                {addData ? (
                  <option value="null">Select Category...</option>
                ) : (
                  <option value={editsubCategoryId}>
                    {editsubCategoryName}
                  </option>
                )}
                {addData
                  ? CategoryData.map((mod) => {
                      return (
                        <option value={mod._id} key={mod._id}>
                          {mod.category}
                        </option>
                      );
                    })
                  : ""}
              </select>
              <TextField
                margin="normal"
                required
                fullWidth
                id="subCategoryName"
                label="Sub-Category Name"
                name="subCategory"
                {...register("subCategory")}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="bg-yellow-ping-grad font-bold"
                sx={{ mt: 3, mb: 2 }}
              >
                {addData ? "Add" : "Update"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </AdminLayout>
  );
}
