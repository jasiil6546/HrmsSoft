import umbre from "../assets/icons/abc.png";

export const menuItems = [
  {
    icon: "mdi:home",
    label: "Home",
    path: "dashboard",
    children: [
      { label: "Overview", path: "dashboard/overview" },
      { label: "Calendar", path: "dashboard/calender" },
    ],
  },
  {
    icon: "mdi:account-group",
    label: "Role",
    path: "role",
    children: [{ label: "Roles", path: "role/roletable" }],
  },
  {
    icon: umbre, 
    label: "Leave Tracker",
    path: "leave",
    children: [{ label: "Leave Summary", path: "leave/summary" },
      { label: "Leave Balance", path: "leave/balance" },
      { label: "Leave Request", path: "leave/request" },
      { label: "Holidays", path: "leave/Holiday" },
    ],
  },
  {
    icon: "mdi:calendar",
    label: "Attendance",
    path: "ate",
  },
  {
    icon: "mdi:clipboard-check",
    label: "Attendance",
    path: "attendance",
  },
  {
    icon: "mdi:format-list-checkbox",
    label: "Tasks",
    path: "tasks",
  },
  {
    icon: "mdi:file-document",
    label: "Files",
    path: "files",
  },
  {
    icon: "mdi:dots-horizontal",
    label: "More",
    path: "more",
  },
];
