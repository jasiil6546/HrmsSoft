import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import AuthButton from "../../components/AuthButtons";
import {
  fetchRoles,
  addRole,
  editRole,
  softDeleteRole,
} from "../../redux/Slice/roleSlice";

const RoleTable = ({ currentUser }) => {
  const dispatch = useDispatch();
  const { roles, loading } = useSelector((state) => state.roles);

  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [roleData, setRoleData] = useState({
    id: null,
    role_name: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleAdd = () => {
    setIsEdit(false);
    setRoleData({ id: null, role_name: "", description: "" });
    setOpenDialog(true);
  };

  const handleEdit = (row) => {
    setIsEdit(true);
    setRoleData({
      id: row.id,
      role_name: row.role_name,
      description: row.description,
    });
    setOpenDialog(true);
  };

  const handleDelete = (row) => {
    if (!row?.id) return;
    dispatch(softDeleteRole({ id: row.id, user: currentUser }));
  };

  const handleDialogSave = () => {
    if (isEdit) {
      dispatch(editRole(roleData));
    } else {
      dispatch(addRole({
        role_name: roleData.role_name,
        description: roleData.description,
      }));
    }
    setOpenDialog(false);
  };

  const columns = [
    { field: "role_name", headerName: "Role Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <AuthButton type="login" size="small" action={() => handleEdit(params.row)}>
            Edit
          </AuthButton>
          <AuthButton type="logout" size="small" action={() => handleDelete(params.row)}>
            Delete
          </AuthButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3,mt:1 }}>
     <Typography 
     variant="h6" 
      sx={{ 
        color: 'primary.main', 
        fontWeight: 'bold', 
       padding: '5px', 
       textAlign:"left",
       allignItems:"left",
       fontSize: "20px",
       mb:1,
     }}
   >
  Roles Management
</Typography>



      {/* Content Card */}
      <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
        {/* Add Role Button */}

        <Box display="flex" justifyContent="flex-end" mb={1}>
          
          <AuthButton type="login" action={handleAdd}>
            Add Role
          </AuthButton>
        </Box>

        {/* Roles DataGrid */}
        <DataGrid
         
          rows={Array.isArray(roles) ? roles : []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          loading={loading}
          getRowId={(row) => row.id || row.role_name}
        />
      </Paper>

      {/* Add/Edit Role Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{isEdit ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Role Name"
            value={roleData.role_name}
            onChange={(e) =>
              setRoleData({ ...roleData, role_name: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Description"
            value={roleData.description}
            onChange={(e) =>
              setRoleData({ ...roleData, description: e.target.value })
            }
            multiline
            rows={3}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDialogSave} variant="contained">
            {isEdit ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleTable;





