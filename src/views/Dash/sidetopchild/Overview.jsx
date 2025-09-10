import React from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Button,
  CardContent,
  Grid,
} from "@mui/material";
import ScheduleIcon from "../../../assets/icons/abc.png";
import ReactApexChart from "react-apexcharts";

import Img from "../../../assets/lmages/inter.jpg";
import Imgb from "../../../assets/lmages/Bag.jpg";
import Him from "../../../assets/lmages/him.jpg";
import "../../../App.css";
import Timer from "../../../components/checkin"

const jsonData = {
  profile: {
    avatar: Him,
    empId: "INTFE0316",
    name: "JASIL PP",
    role: "INTERN MERN Stack Developer",
    locationStatus: "Remote In",
    reportingTo: {
      id: "INTFE0215",
      name: "SHAHID P A",
      status: "Yet to check-in",
    },
    departmentMembers: [
      { id: "INTFE0215", name: "SHAHIDA P A", status: "Yet to check-in" },
      { id: "INTC0002", name: "INSAF P", status: "Remote In" },
    ],
  },
  schedule: {
    period: "31-Aug-2025 - 06-Sep-2025",
    department: "Technical",
    timings: "10:00 AM - 7:00 PM",
    days: [
      { day: "Sun 31", status: "Weekend" },
      { day: "Mon 01", status: "Remote In" },
      { day: "Tue 02", status: "Absent" },
      { day: "Wed 03", status: "Remote In", workHours: "07:17 Hrs" },
      { day: "Thu 04", status: "Remote In" },
      { day: "Fri 05", status: "Absent" },
    ],
  },
  holidays: [
    { name: "Thiruvonam", date: "5-Sep, Friday" },
    { name: "Third Onam", date: "6-Sep, Saturday" },
    { name: "Mahanavami", date: "1-Oct, Wednesday" },
  ],
};

const Overview = () => {
  const { profile, schedule, holidays } = jsonData;


  const colors = ["#1976d2", "#42a5f5", "#66bb6a", "#ef5350", "#ffb74d", "#ab47bc"];

  const chartState = {
    series: [
      {
        data: schedule.days.map((day) => {
          if (day.status === "Remote In") return 7;
          return 0;
        }),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 300,
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return schedule.days[opts.dataPointIndex].status;
        },
        style: {
          colors: ["#000"],
          fontSize: "12px",
          fontWeight: "600",
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: schedule.days.map((day) => day.day),
        labels: {
          style: {
            colors: colors,
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        title: { text: "Hours" },
      },
      tooltip: {
        y: {
          formatter: (val, { dataPointIndex }) => {
            const day = schedule.days[dataPointIndex];
            return `${val} hrs – ${day.status}`;
          },
        },
      },
    },
  };

  return (
    <Box>
   
      <Box
        sx={{
          width: "100%",
          height: 200,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${Imgb})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 0,
        }}
      />

    
      <Grid container spacing={3} sx={{ mt: -8, px: 3 }}>
        
        <Grid item xs={12} md={4} lg={3}>
         
          <Card sx={{ borderRadius: 2, boxShadow: 4, mb: 2 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar
                src={profile.avatar}
                sx={{
                  width: 90,
                  height: 90,
                  mx: "auto",
                  mt: 1,
                  border: "3px solid white",
                  boxShadow: 3,
                }}
              />
              <Typography variant="body2" fontWeight={600} sx={{ mt: 1 }}>
                {profile.empId} – {profile.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.role}
              </Typography>
              <Typography variant="subtitle2" color="success.main" mt={1}>
                {profile.locationStatus}
              </Typography>

              <Timer />
            </CardContent>
          </Card>

      
          <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 2 }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ width: 40, height: 40, mr: 2 }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Reporting To
                </Typography>
                <Typography variant="body2">
                  {profile.reportingTo.id} – {profile.reportingTo.name}{" "}
                  <span style={{ color: "red" }}>{profile.reportingTo.status}</span>
                </Typography>
              </Box>
            </CardContent>
          </Card>

                  <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Department Members
              </Typography>
              {profile.departmentMembers.map((member) => (
                <Box
                  key={member.id}
                  sx={{ display: "flex", alignItems: "center", mt: 1 }}
                >
                  <Avatar sx={{ width: 40, height: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="body2">
                      {member.id} – {member.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color={member.status === "Remote In" ? "green" : "red"}
                    >
                      {member.status}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

       
        <Grid item xs={12} md={8} lg={9} sx={{ width: "70%" }}>
       
          <Card
            sx={{
              p: 2,
              mb: 2,
              boxShadow: 1,
              height: 90,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 2,
              background: "linear-gradient(90deg, #fff 60%, #f8fafc 100%)",
            }}
          >
            <Box
              component="img"
              src={Img}
              alt="Greeting"
              sx={{
                height: 40,
                width: 80,
                mr: 2,
                borderRadius: 1,
                objectFit: "contain",
                background: "#fff",
                boxShadow: 1,
              }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Good Afternoon&nbsp;
                <span style={{ fontWeight: 400, letterSpacing: 1 }}>
                  {profile.name}
                </span>
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Have a productive day!
              </Typography>
            </Box>
            <Box
              sx={{
                ml: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255, 213, 113, 0.18)",
                borderRadius: "50%",
                width: 48,
                height: 48,
              }}
            >
              <img
                src="/your-sun-icon.svg"
                alt=""
                style={{ width: 32, height: 32 }}
              />
            </Box>
          </Card>

         
          <Card sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box sx={{background: "#4fe4ff4d",p:2,borderRadius: "10%", alignItems: "center"  }}>
             <svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="20"
              height="20"
                       viewBox="0 0 256 256"
    
                
                >
             <path
                    fill="#4998ea"
              
                 d="M134 72v46.29l39.32-19.66a6 6 0 0 1 5.36 10.74l-48 24A6 6 0 0 1 122 128V72a6 6 0 0 1 12 0m-6 146a90 90 0 1 1 90-90a6 6 0 0 0 12 0a102 102 0 1 0-102 102a6 6 0 0 0 0-12m101.8 4.46a6 6 0 0 1-11.6 3.08C215.14 214 204.37 206 192 206s-23.14 8-26.2 19.54A6 6 0 0 1 160 230a6.3 6.3 0 0 1-1.54-.2a6 6 0 0 1-4.26-7.34A38.1 38.1 0 0 1 172.72 199a30 30 0 1 1 38.56 0a38.1 38.1 0 0 1 18.52 23.46M174 176a18 18 0 1 0 18-18a18 18 0 0 0-18 18"
              />
               </svg>
               </Box>
                  <Box sx={{ ml: 2, display: "flex", flexDirection: "column" }}>
                       <Typography variant="h6" sx={{fontWeight: 600, color: "#000000ff" }}>Work Schedule</Typography>
                      <Typography sx={{ ml: 0, color: "#666", fontSize: 14 }}>
    {schedule.period}
                       </Typography>
                 </Box>

            </Box>
            <ReactApexChart
              options={chartState.options}
              series={chartState.series}
              type="bar"
              height={300}
            />
          </Card>

<Card sx={{ p: 2, mb: 2 }}>
  {/* Heading with inline SVG icon */}
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
    <Box
      sx={{
        background: "#4fe4ff4d",
        p: 1.5,
        borderRadius: "10%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        viewBox="0 0 48 48"
      >
        <path
          fill="none"
          stroke="#00a7fb"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M6.98 37.018c1.289-1.504 3.21-3.28 5.18-2.964c2.137.343 2.444 2.582 4.44 2.964c2.287.438 3.66-2.61 6.66-2.964c2.672-.314 3.002 1.787 4.933 2.627a4.25 4.25 0 0 0 1.727.337c2.71.013 3.696-2.664 5.92-2.964c.984-.132 2.443.169 4.44 2.223m-11.332-6.979c6.687 1.53 11.145 3.275 13.552 3.275m-37 .37c2.643-.264 7.214-6.578 16.89-4.963q.366.06.73.126m13.628-6.656c.851-4.835-2.537-9.475-7.568-10.363s-9.8 2.312-10.651 7.147z"
        />
        <path
          fill="none"
          stroke="#00a7fb"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M31.282 20.486c.851-4.836-.09-9.044-2.102-9.399s-4.334 3.277-5.186 8.112zM25.71 30.787l1.928-10.944h0z"
        />
      </svg>
    </Box>
    <Typography variant="h6"sx={{ fontWeight: "bold",ml:1.5 }}>Upcoming Holidays</Typography>
  </Box>

  <Box sx={{ display: "flex", gap: 2 }}>
    {holidays.map((holiday, index) => (
      <Card
        key={index}
        sx={{ p: 1, bgcolor: "#e6f8ee", minWidth: 120 }}
      >
        <Typography sx={{ fontSize: 15 }}>{holiday.name}</Typography>
        <Typography sx={{ fontSize: 13 }}>{holiday.date}</Typography>
      </Card>
    ))}
    <Typography
      sx={{
        alignSelf: "center",
        ml: 2,
        color: "#1976d2",
        cursor: "pointer",
      }}
    >
      View all
    </Typography>
  </Box>
</Card>


        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;


