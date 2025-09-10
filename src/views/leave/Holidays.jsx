import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHolidays,
  fetchAllHolidays,
  addHoliday,
  updateHoliday,
  deleteHoliday,
  restoreHoliday,
} from "../../redux/Slice/holidaySlice";
import {
  Box,
  Typography,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Modal,
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
  const [showDeleted, setShowDeleted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (showDeleted) {
      dispatch(fetchAllHolidays());
    } else {
      dispatch(fetchHolidays());
    }
  }, [showDeleted, dispatch]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (form.id) {
      dispatch(updateHoliday({ id: form.id, data: form }));
    } else {
      dispatch(addHoliday(form));
    }
    setForm({ id: null, holidayName: "", date: "", description: "" });
    setOpenModal(false);
  };

  const handleEdit = (holiday) => {
    setForm(holiday);
    setOpenModal(true);
  };

  const handleDelete = (id) => dispatch(deleteHoliday(id));
  const handleRestore = (id) => dispatch(restoreHoliday(id));

  // Filter holidays by search term
  const filteredHolidays = holidays.filter(
    (h) =>
      h.holidayName.toLowerCase().includes(search.toLowerCase()) ||
      h.description.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "holidayName", headerName: "Name", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueGetter: (params) =>
        params?.row?.date
          ? new Date(params.row.date).toLocaleDateString()
          : "—",
    },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "deletedAt",
      headerName: "Deleted At",
      flex: 1.5,
      valueGetter: (params) =>
        params?.row?.deletedAt
          ? new Date(params.row.deletedAt).toLocaleString()
          : "—",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      renderCell: (params) => (
        <>
          {!params?.row?.deletedAt ? (
            <>
              <Button
                size="small"
                onClick={() => handleEdit(params.row)}
                variant="outlined"
              >
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </Button>
            </>
          ) : (
            <Button
              size="small"
              color="success"
              onClick={() => handleRestore(params.row.id)}
            >
              Restore
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Manage Holidays</Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search holidays..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            Add Holiday
          </Button>
        </Box>
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={showDeleted}
            onChange={() => setShowDeleted(!showDeleted)}
          />
        }
        label="Show Deleted Holidays"
      />

      <DataGrid
        autoHeight
        rows={filteredHolidays}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        loading={loading}
        disableSelectionOnClick
        getRowId={(row) => row.id}
      />

      {/* Modal for Add/Edit */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            p: 3,
            bgcolor: "background.paper",
            width: 400,
            mx: "auto",
            mt: "10%",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            {form.id ? "Edit Holiday" : "Add Holiday"}
          </Typography>
          <TextField
            fullWidth
            label="Holiday Name"
            name="holidayName"
            value={form.holidayName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            {form.id ? "Update" : "Add"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Holidays;
g