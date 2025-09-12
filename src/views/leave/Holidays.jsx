import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHolidays,
  addHoliday,
  updateHoliday,
  deleteHoliday,
} from "../../redux/Slice/holidaySlice";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function Holidays() {
  const dispatch = useDispatch();
  const { items: holidays, loading } = useSelector((state) => state.holidays);

  const [form, setForm] = useState({
    id: null,
    holidayName: "",
    date: "",
    description: "",
  });
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("all");
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchHolidays());
  }, [dispatch]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (form.id) dispatch(updateHoliday({ id: form.id, data: form }));
    else dispatch(addHoliday(form));
    handleClose();
  };

  const handleOpen = (holiday = null) => {
    if (holiday) {
      setForm({
        ...holiday,
        date: holiday.date ? new Date(holiday.date).toISOString().split("T")[0] : "",
      });
    } else setForm({ id: null, holidayName: "", date: "", description: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setForm({ id: null, holidayName: "", date: "", description: "" });
    setOpen(false);
  };

  const askDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) dispatch(deleteHoliday(deleteId));
    setDeleteId(null);
    setConfirmOpen(false);
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setConfirmOpen(false);
  };

  const years = [...new Set(holidays.map((h) => h.date && new Date(h.date).getFullYear()))].filter(Boolean);

  const filteredHolidays = holidays.filter((h) => {
    const matchSearch = h.holidayName.toLowerCase().includes(search.toLowerCase());
    const matchYear = year === "all" || (h.date && new Date(h.date).getFullYear() === Number(year));
    return matchSearch && matchYear;
  });

  const rowsWithIndex = filteredHolidays.map((row, index) => ({
    ...row,
    id: row.id || index,
    sl: index + 1,
  }));

  const columns = [
    { field: "sl", headerName: "Sl No", width: 80 },
    { field: "holidayName", headerName: "Holiday Name", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      minWidth: 150,
      sortable: true,
      filterable: true,
      renderCell: (params) => {
        const val = params.value ?? params.row.date; // fallback row.date if params.value undefined
        if (!val) return "—";

        let dateObj = null;
        if (typeof val === "string" || val instanceof String) {
          dateObj = new Date(val);
        } else if (typeof val === "number") {
          dateObj = new Date(val);
        } else {
          return "—";
        }

        return isNaN(dateObj.getTime()) ? "—" : dateObj.toLocaleDateString();
      },
    },
    { field: "description", headerName: "Description", flex: 1, minWidth: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 ,mt:1}}>
          <Button
            size="small"
            variant="outlined"
            sx={{ textTransform: "none", borderColor: "#1976d2", color: "#1976d2", "&:hover": { backgroundColor: "#1976d21a" } }}
            onClick={() => handleOpen(params.row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
            onClick={() => askDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#1b2a4e",
            letterSpacing: 0.5,
            textTransform: "uppercase",
            borderBottom: "1px solid #3536373e",
            display: "inline-block",
            mb: 2,
            ml: 1,
          }}
        >
          Holidays
        </Typography>
        <Button variant="contained" sx={{ textTransform: "none" }} onClick={() => handleOpen()}>
          + Add Holiday
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 2 }}>
        <TextField size="small" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <Select size="small" value={year} onChange={(e) => setYear(e.target.value)} displayEmpty sx={{ minWidth: 120 }}>
          <MenuItem value="all">All Years</MenuItem>
          {years.map((y) => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rowsWithIndex}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          loading={loading}
          disableSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {  color: "#000000ff", fontWeight: 600 },
            "& .MuiDataGrid-columnSeparator": { display: "none" },
            "& .MuiDataGrid-row:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
            "& .MuiDataGrid-row:hover": { backgroundColor: "#e3f2fd" },
          }}
        />
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{form.id ? "Edit Holiday" : "Add New Holiday"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Holiday Name" name="holidayName" value={form.holidayName} onChange={handleChange} fullWidth />
          <TextField type="date" name="date" value={form.date} onChange={handleChange} fullWidth />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {form.id ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this holiday?</DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Holidays;

