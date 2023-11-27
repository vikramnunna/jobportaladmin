import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AdminLayout from "../../Layout/AdminLayout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import "../../App.css";
// import "../../Components/Category/Table.css";
import { getApihandler, postApihandler } from "../../API_Handler";
import { Grid, TextareaAutosize } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddJob() {
  const [CategoryData, setCategoryData] = useState([]);
  const [SubCategoryData, setSubCategoryData] = useState([]);
  const { register, handleSubmit, watch, getValues } = useForm();
  const Navigate = useNavigate();
  const [CategoryValue, setCategoryValue] = useState();
  console.log("Category Value is -", CategoryValue);

  // console.log(`Onchange Value is - ${onChange} and name is - ${name}`);
  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    if (CategoryValue !== undefined) {
      getSubCategory();
      // console.log("Sub Category use effect called");
    }
  }, [CategoryValue]);

  // API's Function----
  const getCategory = async () => {
    let result = await getApihandler("/getCategory/All");
    setCategoryData(result.data);
    // console.log(" get category result is - ", result.data);
  };

  const getSubCategory = async () => {
    if (CategoryValue !== undefined) {
      let result = await getApihandler(
        `/getSubCategory/categoryName_${CategoryValue}`
      );
      // console.log("getSubCategory result - ", result);
      setSubCategoryData(result.data);
    }
  };

  const submitJob = async (value) => {
    const {
      title,
      description,
      jobType,
      salaryRange,
      subCategory,
      jobLocation,
    } = value;

    const data = {
      title: title,
      description: description,
      jobType: jobType,
      salaryRange: salaryRange,
      subCategory: subCategory,
      jobLocation: jobLocation,
      category: CategoryValue,
    };
    console.log("Submitted Data is - ", data);
    const result = await postApihandler("/addJobs", data);
    console.log("Job result is - ", result);
    if (result.status === 200) {
      swal({
        title: "Congratulations!",
        text: "New Job Has Added!",
        icon: "success",
        button: "Done!",
      });
      Navigate("/Jobs");
    } else {
      let Response = `${result.error.response.data.message}`;
      const finalSentence = Response.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      );
      swal("Sorry!", `${finalSentence}, Please Try Again!`, "error");
    }
  };

  return (
    <AdminLayout>
      <div className="add-Job-wrapper pt-4 ps-5">
        <Box
          component="form"
          onSubmit={handleSubmit(submitJob)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid
            container
            spacing={5}
            maxWidth="xl"
            className="justify-content-between"
          >
            <Grid item xs={12} className="pt-5 pb-3 px-0">
              <h2 className="page-title">Add New Job</h2>
            </Grid>

            {/* Left Blocks */}
            <Grid item xs={7} className="p-0">
              {/* Job Title */}
              <Grid item xs={12}>
                <FormControl
                  style={{ minWidth: "100%" }}
                  className="shadow-lg py-3 px-4 rounded-3"
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Job Title"
                    name="title"
                    {...register("title")}
                  />
                </FormControl>
              </Grid>

              {/* Description */}
              <Grid item xs={12} className="mt-4">
                <FormControl
                  style={{ minWidth: "100%" }}
                  className="shadow-lg py-4 px-4 rounded-3"
                >
                  <TextareaAutosize
                    minRows={10}
                    aria-label="maximum height"
                    placeholder="Job Description..."
                    style={{
                      width: "100%",
                      border: "1px solid rgb(10 10 10 / 25%)",
                      borderRadius: "5px",
                      padding: "20px",
                    }}
                    {...register("description")}
                  />
                </FormControl>
              </Grid>

              {/* Details */}
              <Grid item xs={12} className="mt-4">
                <div className="Job-details-wrapper shadow-lg py-4 px-4 rounded-3">
                  <h4 className="Job-block-title mb-4">Job Details:</h4>
                  <Grid container spacing={5}>
                    {/* Category */}
                    <Grid item xs={6} className="pt-5">
                      <select
                        fontSize="16px"
                        style={{
                          padding: "16.5px 14px",
                          width: "100%",
                          borderRadius: "5px",
                          borderColor: "rgb(0 0 0 / 28%)",
                        }}
                        onChange={(e) => {
                          setCategoryValue(e.target.value);
                        }}
                      >
                        <option value="null">Category...</option>
                        {CategoryData !== undefined &&
                          CategoryData !== null &&
                          CategoryData.map((mod) => {
                            return (
                              <option value={mod.category} key={mod._id}>
                                {mod.category}
                              </option>
                            );
                          })}
                      </select>
                    </Grid>
                    {/* Sub Category */}
                    <Grid item xs={6} className="pt-5">
                      <select
                        fontSize="16px"
                        style={{
                          padding: "16.5px 14px",
                          width: "100%",
                          borderRadius: "5px",
                          borderColor: "rgb(0 0 0 / 28%)",
                        }}
                        {...register("subCategory")}
                      >
                        <option value="null">Sub-Category...</option>

                        {SubCategoryData != undefined &&
                          SubCategoryData.map((mod) => {
                            return (
                              <option value={mod.subCategory} key={mod._id}>
                                {mod.subCategory}
                              </option>
                            );
                          })}
                      </select>
                    </Grid>
                    {/* Job Salary */}
                    <Grid item xs={6} className="pt-3">
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="salaryRange"
                        label="Salary Range"
                        name="salaryRange"
                        {...register("salaryRange")}
                      />
                    </Grid>
                    {/* Job Location */}
                    <Grid item xs={6} className="pt-3">
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="jobLocation"
                        label="Job Location"
                        name="jobLocation"
                        {...register("jobLocation")}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>

              {/* Short Description */}
            </Grid>

            {/* Right Blocks */}
            <Grid item xs={4} className=" py-3 me-5">
              <Grid
                container
                spacing={2}
                className="align-items-center justify-content-center shadow-lg py-4 px-4 rounded-3"
              >
                {/* Job Type */}
                <Grid item xs={12} className="pt-3">
                  <h4 className="Job-block-title ">Job Type:</h4>
                  <FormControl style={{ minWidth: "100%" }}>
                    <Select
                      labelId="custom-select-label"
                      id="custom-select"
                      displayEmpty
                      renderValue={(value) => (value ? value : "Job Type")}
                      {...register("jobType")}
                    >
                      <MenuItem value="Full Time">Full Time</MenuItem>
                      <MenuItem value="Part Time">Part Time</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    className="bg-yellow-ping-grad font-bold"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </AdminLayout>
  );
}
