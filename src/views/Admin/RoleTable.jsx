import React, { useEffect, useState } from "react"; // React hooks
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { DataGrid } from "@mui/x-data-grid"; // MUI DataGrid
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material"; // MUI components
import AuthButton from "../../components/AuthButtons"; // Custom buttons
import { fetchRoles, addRole, editRole, softDeleteRole } from "../../redux/Slice/roleSlice"; // Redux async actions

const RoleTable = ({ currentUser }) => {
  const dispatch = useDispatch(); // Redux dispatcher
  const { roles, loading, error } = useSelector((state) => state.roles); // Redux state

  const [openDialog, setOpenDialog] = useState(false); // Add/Edit dialog visibility
  const [isEdit, setIsEdit] = useState(false); // Flag to check if editing
  const [roleData, setRoleData] = useState({ id: null, role_name: "", description: "" }); // Form data

  useEffect(() => {
    dispatch(fetchRoles()); // Fetch roles on mount
  }, [dispatch]);

  const handleAdd = () => { // Open add role dialog
    setIsEdit(false);
    setRoleData({ id: null, role_name: "", description: "" });
    setOpenDialog(true);
  };

  const handleEdit = (row) => { // Open edit role dialog
    setIsEdit(true);
    setRoleData({ id: row.id, role_name: row.role_name, description: row.description });
    setOpenDialog(true);
  };

  const handleDelete = (row) => { // Soft delete role
    if (!row?.id) return;
    dispatch(softDeleteRole({ id: row.id, user: currentUser }));
  };

  const handleDialogSave = () => { // Save role (add or edit)
    if (isEdit) {
      dispatch(editRole(roleData));
    } else {
      dispatch(addRole({ role_name: roleData.role_name, description: roleData.description }));
    }
    setOpenDialog(false);
  };

  const columns = [ // DataGrid columns
    { field: "role_name", headerName: "Role Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <AuthButton type="login" size="small" action={() => handleEdit(params.row)}>Edit</AuthButton>
          <AuthButton type="logout" size="small" action={() => handleDelete(params.row)}>Delete</AuthButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {/* Add Role Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <AuthButton type="login" action={handleAdd}>Add Role</AuthButton>
      </Box>

      {/* Roles DataGrid */}
      <DataGrid
        autoHeight
        rows={Array.isArray(roles) ? roles : []} // Ensure valid array
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        loading={loading} // Show loading indicator
        getRowId={(row) => row.id || row.role_name} // Unique row id
      />

      {/* Add/Edit Role Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isEdit ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Role Name"
            value={roleData.role_name}
            onChange={(e) => setRoleData({ ...roleData, role_name: e.target.value })}
          />
          <TextField
            label="Description"
            value={roleData.description}
            onChange={(e) => setRoleData({ ...roleData, description: e.target.value })}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDialogSave} variant="contained">{isEdit ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleTable;




