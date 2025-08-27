// src/components/CheckInOutHeader.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Chip, Box, Alert } from "@mui/material";
import { checkIn, checkOut, fetchAttendance, resetMessage } from "../../redux/Slice/attendenceSlice";

function formatHMS(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
  const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function CheckInOutHeader() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "null") || JSON.parse(sessionStorage.getItem("user") || "null");
  const user_id = user?.id || user?._id;

  const { checkedIn, lastCheckInTime, totalMinutesToday, loading, error, message } = useSelector(s => s.attendance);
  const [now, setNow] = useState(Date.now());

  // fetch attendance on mount
  useEffect(() => { if (user_id) dispatch(fetchAttendance(user_id)); }, [dispatch, user_id]);

  // live timer tick
  useEffect(() => {
    if (!checkedIn) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [checkedIn]);

  // clear messages automatically
  useEffect(() => {
    if (message || error) {
      const t = setTimeout(() => dispatch(resetMessage()), 3000);
      return () => clearTimeout(t);
    }
  }, [message, error, dispatch]);

  const workedSeconds = useMemo(() => {
    const finished = (totalMinutesToday || 0) * 60;
    if (!checkedIn || !lastCheckInTime) return finished;
    const start = new Date(lastCheckInTime).getTime();
    return finished + Math.max(0, Math.floor((now - start) / 1000));
  }, [checkedIn, lastCheckInTime, totalMinutesToday, now]);

  const handleCheckIn = () => { if (user_id) dispatch(checkIn(user_id)); };
  const handleCheckOut = () => { if (user_id) dispatch(checkOut(user_id)); };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt:2 }}>
      <Chip label={checkedIn ? "Checked In" : "Checked Out"} color={checkedIn ? "success" : "default"} size="small" />
      <Typography variant="body1" sx={{ fontFamily: "monospace" }}>{formatHMS(workedSeconds)}</Typography>
      {!checkedIn ? (
        <Button size="small" variant="contained" onClick={handleCheckIn} disabled={loading}>{loading ? "..." : "In"}</Button>
      ) : (
        <Button size="small" variant="contained" color="#000000ff" onClick={handleCheckOut} disabled={loading}>{loading ? "..." : "Out"}</Button>
      )}
      {(message || error) && <Alert severity={message ? "success" : "error"} sx={{ ml: 2 }}>{message || error}</Alert>}
    </Box>
  );
}
