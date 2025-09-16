// adminMenuItems.js
export const adminMenuItems = [
  {
    icon: "mdi:view-dashboard",
    label: "Admin Dashboard",
    path: "admin/dashboard",
  },
  {
    icon: "mdi:account-group",
    label: "Role",
    path: "role",
    children: [{ label: "Roles", path: "role/roletable" }],
  },
  {
    icon: "mdi:calendar-check",
    label: "Admin Goals",
    path: "admin/dashboard/Goals",
  },
];
