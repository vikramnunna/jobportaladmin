import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import styles from "./dashboard.module.css";
import { Card, Grid, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { getApihandler } from "../../API_Handler";

const Dashboard = () => {
  // useState
  const [data, setData] = useState({});
  const [agents, setAgents] = useState([]);

  // useEffect
  useEffect(() => {
    getCount();
  }, []);
  const getCount = async () => {
    const res = await getApihandler("/getCountOfData");
    setData(res.data);
    console.log("res----->", res.data);
  };
  // Boxes Style
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <AdminLayout>
        <Grid container className={styles.dashboard_outer_div}>
          <Grid xs={12} sm={12} lg={12}>
            <Typography className={styles.upper_heading}>Dashboard</Typography>

            {/* <Link to="/properteis"> */}
            <div className={styles.propert_card_outerdiv}>
              <Grid container>
                <Grid
                  xs={12}
                  sm={3}
                  lg={2}
                  className={styles.property_icon_outergrid}
                >
                  <WorkIcon sx={{ fontSize: "5rem", color: "white" }} />
                </Grid>
                <Grid xs={12} sm={6} lg={8} sx={{ padding: "5px" }}>
                  <Typography
                    sx={{
                      fontSize: "22px",
                      lineHeight: "1.5",
                      fontWeight: "600",
                      textAlign: "start",
                      color: "#fff",
                    }}
                  >
                    Total Jobs
                  </Typography>
                  <div
                    style={{ height: "5px", background: "white" }}
                    className="mt-3"
                  ></div>
                </Grid>
                <Grid
                  xs={12}
                  sm={3}
                  lg={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "10px",
                    color: "black",
                  }}
                >
                  <Typography sx={{ fontSize: "2.5rem", color: "#fff" }}>
                    {data.jobCount}
                  </Typography>
                </Grid>
              </Grid>
            </div>
            {/* </Link> */}

            {/* Dashboard Cards------------- */}
            <Grid
              spacing={{ xs: 2, lg: 2 }}
              container
              xs={12}
              sm={12}
              lg={12}
              className={styles.cards_outer_grid}
            >
              <Grid item xs={12} sm={6} lg={6}>
                <Item sx={{ boxShadow: 5, paddingY: 2, borderRadius: 2 }}>
                  <Link to="">
                    <Card
                      style={{
                        width: "100%",
                        boxShadow: "none",
                        borderRadius: 10,
                        border: "none",
                      }}
                      className="align-items-center"
                    >
                      <Grid
                        container
                        spacing={{ xs: 0, lg: 3 }}
                        columns={16}
                        className="align-items-center"
                      >
                        <Grid item xs={6}>
                          <PeopleIcon
                            sx={{
                              color: "#004274",
                              marginTop: "10px",
                              fontSize: "3rem",
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          className={styles.cards_dynamic_value}
                        >
                          <Typography
                            className=""
                            style={{
                              color: "black",
                              fontSize: "40px",
                              fontWeight: "600",
                            }}
                          >
                            {data.userCount}
                          </Typography>
                          <Typography
                            className="text-black "
                            style={{ fontSize: "20px" }}
                          >
                            Users
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  </Link>
                </Item>
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <Item sx={{ boxShadow: 5, paddingY: 2, borderRadius: 2 }}>
                  <Link to="">
                    <Card
                      style={{
                        width: "100%",
                        boxShadow: "none",
                        borderRadius: 10,
                        border: "none",
                      }}
                      className="align-items-center"
                    >
                      <Grid
                        container
                        spacing={{ xs: 0, lg: 3 }}
                        columns={16}
                        className="align-items-center"
                      >
                        <Grid item xs={6}>
                          <WorkIcon
                            sx={{
                              color: "#004274",
                              marginTop: "10px",
                              fontSize: "3rem",
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          className={styles.cards_dynamic_value}
                        >
                          <Typography
                            className=""
                            style={{
                              color: "black",
                              fontSize: "40px",
                              fontWeight: "600",
                            }}
                          >
                            {data.jobCount}
                          </Typography>
                          <Typography
                            className="text-black "
                            style={{ fontSize: "20px" }}
                          >
                            Jobs
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  </Link>
                </Item>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AdminLayout>
    </>
  );
};

export default Dashboard;
