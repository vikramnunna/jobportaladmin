import React, { useEffect, useState } from "react";

import FormControl from "@mui/material/FormControl";

import AdminLayout from "../../Layout/AdminLayout";
import Box from "@mui/material/Box";

import "../../App.css";
// import "../../Components/Category/Table.css";
import { getApihandler, putApihandler } from "../../API_Handler";
import { Button, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import swal from "sweetalert";

export default function CandidateDetails() {
  const { userid, applid } = useParams();

  const [userdata, setUserdata] = useState({});
  const [cheack, setCheack] = useState();
  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    if (cheack !== undefined) {
      verifyReject();
    }
  }, [cheack]);
  const verifyReject = async () => {
    console.log("hi");
    const aaray = {
      job_status: cheack,
    };
    console.log("aaray", aaray);
    const res = await putApihandler(
      `/responseOfJobApplications/${applid}`,
      aaray
    );
    console.log("res----->", res);
    if (res.status === 200) {
      Swal.fire({
        position: "middle-centre",
        icon: "success",
        title: cheack === 1 ? "Verify User" : "Rejected User",
        showConfirmButton: false,
        timer: 2000,
      });
      // history("/login");
    } else {
      swal("Sorry!", `${res.error.response.data.message}`, "error");
    }
  };
  const getUserData = async () => {
    const res = await getApihandler(`/getUserInfo/${userid}`);
    // console.log("res--->", res.data);
    setUserdata(res.data);
  };

  return (
    <AdminLayout>
      <div className="add-Job-wrapper pt-4 ps-5">
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Grid
            container
            spacing={5}
            maxWidth="xl"
            className="justify-content-between"
          >
            <Grid item xs={12} className="pt-5 pb-3 px-0">
              <h2 className="page-title">Candidate Details</h2>
            </Grid>

            {/* Left Blocks */}
            <Grid item xs={7} className="p-0">
              {/* Job Title */}
              <Grid item xs={12}>
                <FormControl
                  style={{ minWidth: "100%" }}
                  className="shadow-lg py-3 px-4 rounded-3"
                >
                  <h5 className="Job-block-title ">
                    <strong>Name -</strong>
                    {userdata.name}
                  </h5>
                </FormControl>
              </Grid>
              <Grid item xs={12} className="mt-4">
                <FormControl
                  style={{ minWidth: "100%" }}
                  className="shadow-lg py-3 px-4 rounded-3"
                >
                  <h5 className="Job-block-title ">
                    <strong>Email -</strong> {userdata.userEmail}
                  </h5>
                </FormControl>
              </Grid>
              <Grid item xs={12} className="mt-4">
                <FormControl
                  style={{ minWidth: "100%" }}
                  className="shadow-lg py-3 px-4 rounded-3"
                >
                  <h5 className="Job-block-title ">
                    <strong>Mobile no. -</strong> {userdata.phone_number}
                  </h5>
                </FormControl>
              </Grid>
              <Grid item xs={12} className="mt-4">
                <FormControl
                  style={{ minWidth: "100%" }}
                  className="shadow-lg py-3 px-4 rounded-3"
                >
                  <h5 className="Job-block-title ">
                    <strong>Gender -</strong> {userdata.gender}
                  </h5>
                </FormControl>
              </Grid>
              <Grid item xs={12} className="mt-4">
                <FormControl
                  style={{ minWidth: "100%" }}
                  className="shadow-lg py-3 px-4 rounded-3"
                >
                  <h5 className="Job-block-title ">
                    <strong>Hobby -</strong> {userdata.hobbies}
                  </h5>
                </FormControl>
              </Grid>
              <div
                style={{
                  display: "flex",
                  padding: "2rem",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    setCheack(1);
                  }}
                >
                  Verify
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setCheack(-1);
                  }}
                >
                  Reject
                </Button>
              </div>
            </Grid>

            {/* Right Blocks */}
            <Grid item xs={4} className=" py-3 me-5">
              {/* <Grid
                container
                spacing={2}
                className="align-items-center justify-content-center shadow-lg py-4 px-4 rounded-3"
              > */}
              {/* Job Type */}
              {/* <Grid item xs={12} className="pt-3">
                  <h4 className="Job-block-title ">Resume</h4>
                </Grid> */}

              {/* Submit Button */}
              {/* <Grid item xs={12}>
                  <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    className="bg-yellow-ping-grad font-bold"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Download
                  </Button> 
                  <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    className="bg-yellow-ping-grad font-bold ms-3"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    View
                  </Button>
                </Grid> */}
              {/* </Grid> */}
            </Grid>
          </Grid>
        </Box>
      </div>
    </AdminLayout>
  );
}
