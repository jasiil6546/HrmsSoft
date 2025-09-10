import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Divider,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  CalendarToday as CalendarTodayIcon,
  AccessTime as AccessTimeIcon,
  WorkOff as WorkOffIcon,
  EventBusy as EventBusyIcon,
  HomeWork as HomeWorkIcon,
  Sick as SickIcon,
  EmojiEvents as EmojiEventsIcon,
} from "@mui/icons-material";

import leaveData from "../../Json/leaveData.json";
import holidayData from "../../Json/Holiday.json";

export default function LeaveSummary() {
  const yearOptions = leaveData.map((d) => d.year);
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);
  const [startIndex, setStartIndex] = useState(0);

  const currentYearData = leaveData.find((d) => d.year === selectedYear);
  const leaveTypes = currentYearData?.leaveTypes || [];
  const totalBooked = leaveTypes.reduce((sum, l) => sum + l.booked, 0);
  const visibleCards = leaveTypes.slice(startIndex, startIndex + 6);

  const currentHolidays =
    holidayData.find((h) => h.year === selectedYear)?.holidays || [];

  const handlePrevLeave = () => startIndex > 0 && setStartIndex(startIndex - 1);
  const handleNextLeave = () =>
    startIndex < leaveTypes.length - 6 && setStartIndex(startIndex + 1);

  const handlePrevYear = () => {
    const idx = yearOptions.indexOf(selectedYear);
    if (idx > 0) setSelectedYear(yearOptions[idx - 1]);
  };
  const handleNextYear = () => {
    const idx = yearOptions.indexOf(selectedYear);
    if (idx < yearOptions.length - 1) setSelectedYear(yearOptions[idx + 1]);
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      weekday: "short",
    });

  const iconMap = {
    "Casual Leave": (
      <AccessTimeIcon
        sx={{
          fontSize: 32,
          p: 1,
          color: "#3d9dfeff",
          bgcolor: "#1e8fff49",
          borderRadius: "10%",
        }}
      />
    ),
    "Compensatory Off": (
      <EmojiEventsIcon
        sx={{
          fontSize: 32,
          color: "#32CD32",
          bgcolor: "#1eff7149",
          borderRadius: "10%",
          p: 1,
        }}
      />
    ),
    "Earned Leave": (
      <WorkOffIcon
        sx={{
          fontSize: 32,
          color: "#9370DB",
          bgcolor: "#9a1eff49",
          borderRadius: "10%",
          p: 1,
        }}
      />
    ),
    "Emergency WFH": (
      <HomeWorkIcon
        sx={{
          fontSize: 32,
          color: "#FF8C00",
          bgcolor: "#ffb41e49",
          borderRadius: "10%",
          p: 1,
        }}
      />
    ),
    "Leave Without Pay": (
      <EventBusyIcon
        sx={{
          fontSize: 32,
          color: "#FF6347",
          bgcolor: "#ff634746",
          borderRadius: "10%",
          p: 1,
        }}
      />
    ),
    "Sick Leave": (
      <SickIcon
        sx={{
          fontSize: 32,
          color: "#8A2BE2",
          bgcolor: "#bf1eff43",
          borderRadius: "10%",
          p: 1,
        }}
      />
    ),
    "Special Leave": (
      <AccessTimeIcon
        sx={{
          fontSize: 32,
          color: "#20B2AA",
          bgcolor: "#ff1ee149",
          borderRadius: "10%",
          p: 1,
        }}
      />
    ),
    WFH: (
      <HomeWorkIcon
        sx={{
          fontSize: 32,
          color: "#00BFFF",
          bgcolor: "#1b8dff49",
          borderRadius: "10%",
          p: 1,
        }}
      />
    ),
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ p: 2 }}>
  
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          mb: 2,
          width: "100%",
        }}
      >
        <Typography
          variant="body1"
          sx={{ textAlign: "left", color: "#34333392" }}
        >
          Leave booked this year:{" "}
          <b style={{ color: "#333" }}>{totalBooked} day(s)</b> | Absent:{" "}
          <b style={{ color: "#333" }}>0</b>
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#ffffffff",
            borderRadius: 1,
            p: 1,
            flexWrap: "wrap",
          }}
        >
          <IconButton
            size="small"
            onClick={handlePrevYear}
            disabled={selectedYear === yearOptions[0]}
          >
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>

          <CalendarTodayIcon sx={{ fontSize: 22, color: "#272525ff" }} />

          <IconButton
            size="small"
            onClick={handleNextYear}
            disabled={selectedYear === yearOptions[yearOptions.length - 1]}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>

          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 15,
              textAlign: "center",
              minWidth: isSmallScreen ? "100%" : "auto",
            }}
          >
            01-Jan-{selectedYear} - 31-Dec-{selectedYear}
          </Typography>
        </Box>
      </Box>

    
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <IconButton onClick={handlePrevLeave} disabled={startIndex === 0}>
          <ArrowBackIosIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          {visibleCards.map((leave, i) => (
            <Card
              key={i}
              sx={{
                minWidth: isSmallScreen ? "45%" : 160,
                maxWidth: 200,
                height: 240,
                flex: 1,
                border: "1px solid #eee",
                borderRadius: 2,
              }}
            >
              <CardContent
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "85%",
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {leave.leaveType}
                </Typography>
                <Box sx={{ mb: 1 }}>{iconMap[leave.leaveType]}</Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                  }}
                >
                  <Typography sx={{ color: "black" }}>Available</Typography>
                  <Typography
                    sx={{ color: leave.available > 0 ? "green" : "red" }}
                  >
                    {leave.available}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                  }}
                >
                  <Typography sx={{ color: "black" }}>Booked</Typography>
                  <Typography sx={{ color: "red" }}>{leave.booked}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <IconButton
          onClick={handleNextLeave}
          disabled={startIndex >= leaveTypes.length - 6}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      
      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              gap: 1,
            }}
          >
            <Typography variant="subtitle1">Upcoming Holidays</Typography>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              size="small"
            >
              {holidayData.map((h) => (
                <MenuItem key={h.year} value={h.year}>
                  {h.year}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Divider />

          <Box
            sx={{
              mt: 1,
              maxHeight: 250,
              overflowY: "auto",
            }}
          >
            {currentHolidays.map((h, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: isSmallScreen ? "column" : "row",
                  justifyContent: "space-between",
                  py: 1,
                  borderBottom: "1px solid #f0f0f0",
                  gap: 1,
                }}
              >
                <Typography sx={{ minWidth: 160 }}>{formatDate(h.date)}</Typography>
                <Typography sx={{ flex: 1 }}>{h.holidayName}</Typography>
                <Typography sx={{ flex: 1 }}>{h.holidayName}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}




