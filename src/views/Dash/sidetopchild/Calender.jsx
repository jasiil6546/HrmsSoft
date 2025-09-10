import React from "react";
import dayjs from "dayjs";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DataGrid } from "@mui/x-data-grid";

const WEEKDAYS = [
  { key: "sun", label: "Sun" },
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
];

const EVENT_STYLES = {
  present: { bg: "#e6f4ea" }, 
  absent: { bg: "#fde7e9" },  
  holiday: { bg: "#e7f0fb" }, 
};

function eventTypeFromLabel(label = "") {
  const low = label.toLowerCase();
  if (low.includes("present")) return "present";
  if (low.includes("absent")) return "absent";
  return "holiday";
}

function buildMonthMatrix(cursor) {
  const startOfMonth = cursor.startOf("month");
  const endOfMonth = cursor.endOf("month");

  const startOffset = startOfMonth.day();
  const firstCell = startOfMonth.subtract(startOffset, "day");

  const totalCells = 42; // 6 weeks grid
  const cells = Array.from({ length: totalCells }, (_, i) =>
    firstCell.add(i, "day")
  );

  const weeks = [];
  for (let i = 0; i < totalCells; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return { weeks, startOfMonth, endOfMonth };
}

function DayCell({ day, events, inMonth, isToday }) {
  return (
    <Box sx={{ p: 1.25, height: "100%", width: "100%" }}>
      <Stack spacing={0.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, opacity: inMonth ? 1 : 0.4 }}
          >
            {day.date()}
          </Typography>

          {isToday && (
            <Box
              sx={{
                bgcolor: "#1a73e8",
                color: "#fff",
                fontSize: 12,
                minWidth: 22,
                height: 22,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}
            >
              {day.date()}
            </Box>
          )}
        </Stack>

        <Stack spacing={0.5}>
          {(events || []).map((ev, idx) => {
            const type = eventTypeFromLabel(ev.label);
            const palette = EVENT_STYLES[type];
            return (
              <Chip
                key={idx}
                label={ev.label}
                size="small"
                sx={{
                  bgcolor: palette.bg,
                  borderRadius: "8px",
                  "& .MuiChip-label": { px: 1, fontSize: 12, fontWeight: 600 },
                }}
              />
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
}

function Calender() {
  const [cursor, setCursor] = React.useState(() => dayjs("2025-09-01"));
  const today = dayjs();

  
  const events = [
    { date: "2025-09-01", label: "Present(Remote In)" },
    { date: "2025-09-02", label: "Absent" },
    { date: "2025-09-03", label: "Present(Remote In)" },
    { date: "2025-09-05", label: "Thiruvonam(Holiday)" },
    { date: "2025-09-06", label: "Third Onam(Holiday)" },
  ];

 
  const eventMap = React.useMemo(() => {
    const map = new Map();
    events.forEach((it) => {
      const key = dayjs(it.date).format("YYYY-MM-DD");
      if (!map.has(key)) map.set(key, []);
      map.get(key).push({ label: it.label });
    });
    return map;
  }, [events]);

  const { weeks, startOfMonth, endOfMonth } = React.useMemo(
    () => buildMonthMatrix(cursor),
    [cursor]
  );

  const rows = weeks.map((week, i) => {
    const row = { id: i };
    WEEKDAYS.forEach((w, idx) => {
      const d = week[idx];
      const key = d.format("YYYY-MM-DD");
      row[w.key] = {
        day: d,
        events: eventMap.get(key) || [],
        inMonth:
          d.isAfter(startOfMonth.subtract(1, "day")) &&
          d.isBefore(endOfMonth.add(1, "day")),
        isToday: d.isSame(today, "day"),
      };
    });
    return row;
  });

  const columns = WEEKDAYS.map((w, idx) => ({
    field: w.key,
    headerName: w.label,
    flex: 1,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "left",
    renderCell: (params) => {
      const payload = params.value;
      return (
        <DayCell
          day={payload.day}
          events={payload.events}
          inMonth={payload.inMonth}
          isToday={payload.isToday}
        />
      );
    },
    cellClassName: () => (idx === 0 || idx === 6 ? "weekend" : ""),
  }));

  return (
    <Stack sx={{ height: "100%", width: "100%", bgcolor: "#fff" }} spacing={2}>
  
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, pt: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton size="small" onClick={() => setCursor((c) => c.subtract(1, "month"))}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton size="small" onClick={() => setCursor((c) => c.add(1, "month"))}>
            <ChevronRightIcon />
          </IconButton>
          <Box sx={{ ml: 1, display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarMonthIcon fontSize="small" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {cursor.format("MMM YYYY")}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      
      <Box sx={{ height: 560, px: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter
          disableRowSelectionOnClick
          disableColumnSelector
          disableDensitySelector
          sx={{
            border: "1px solid #eee",
            borderRadius: 2,
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "#fafafa",
              borderBottom: "1px solid #eee",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },
            "& .MuiDataGrid-cell": {
              borderRight: "1px solid #f3f3f3",
              borderBottom: "1px solid #f3f3f3",
              alignItems: "flex-start",
              py: 0,
            },
            "& .MuiDataGrid-row": {
              minHeight: 100,
              maxHeight: 100,
            },
            "& .weekend": {
              backgroundColor: "#fbf6e9", 
            },
          }}
          getRowHeight={() => 100}
        />
      </Box>
    </Stack>
  );
}

export default Calender;

