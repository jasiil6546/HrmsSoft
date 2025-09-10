import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkOffIcon from "@mui/icons-material/WorkOff";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import SickIcon from "@mui/icons-material/Sick";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import leaveData from "../../Json/leaveData.json";

export default function LeaveBalance() {
  const yearOptions = leaveData.map((d) => d.year);
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const currentYearData = leaveData.find((d) => d.year === selectedYear);
  const leaveTypes = currentYearData?.leaveTypes || [];

  const iconMap = {
    "Casual Leave": (
      <AccessTimeIcon sx={{ fontSize: 32, p: 1, color: "#3d9dfeff", bgcolor: "#1e8fff49", borderRadius: "10%" }} />
    ),
    "Compensatory Off": (
      <EmojiEventsIcon sx={{ fontSize: 32, color: "#32CD32", bgcolor: "#1eff7149", borderRadius: "10%", p: 1 }} />
    ),
    "Earned Leave": (
      <WorkOffIcon sx={{ fontSize: 32, color: "#9370DB", bgcolor: "#9a1eff49", borderRadius: "10%", p: 1 }} />
    ),
    "Emergency WFH": (
      <HomeWorkIcon sx={{ fontSize: 32, color: "#FF8C00", bgcolor: "#ffb41e49", borderRadius: "10%", p: 1 }} />
    ),
    "Leave Without Pay": (
      <EventBusyIcon sx={{ fontSize: 32, color: "#FF6347", bgcolor: "#ff634746", borderRadius: "10%", p: 1 }} />
    ),
    "Sick Leave": (
      <SickIcon sx={{ fontSize: 32, color: "#8A2BE2", bgcolor: "#bf1eff43", borderRadius: "10%", p: 1 }} />
    ),
    "Special Leave": (
      <AccessTimeIcon sx={{ fontSize: 32, color: "#20B2AA", bgcolor: "#ff1ee149", borderRadius: "10%", p: 1 }} />
    ),
    WFH: (
      <HomeWorkIcon sx={{ fontSize: 32, color: "#00BFFF", bgcolor: "#1b8dff49", borderRadius: "10%", p: 1 }} />
    ),
  };

  return (
    <Box sx={{ p: isSmallScreen ? 2 : 5 }}>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <CalendarTodayIcon sx={{ fontSize: 22, color: "#080606ff" }} />
        <Select
          size="small"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          sx={{ minWidth: 100 }}
        >
          {yearOptions.map((y) => (
            <MenuItem key={y} value={y}>{y}</MenuItem>
          ))}
        </Select>
      </Box>

    
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxHeight: 500,
          overflowY: "auto",
        }}
      >
        {leaveTypes.map((leave, i) => (
          <Card
            key={i}
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              minHeight: 80,
            }}
          >
           
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: isSmallScreen ? 1 : 0,
              }}
            >
              {iconMap[leave.leaveType]}
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {leave.leaveType}
              </Typography>
            </Box>

           
            <Box
              sx={{
                display: "flex",
                gap: isSmallScreen ? 2 : 4,
                width: "100%",
                justifyContent: isSmallScreen ? "space-around" : "flex-end",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: 12, color: "gray" }}>Available</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: "green" }}>
                  {leave.available}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: 12, color: "gray" }}>Booked</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: "red" }}>
                  {leave.booked}
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
