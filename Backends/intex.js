const express = require("express");
const cors = require("cors");
const authRouter = require("./Models/auth"); // import router
const passRouter= require("./Models/pass");
const Attendence= require("./Models/attendance");
const rolesRouter = require("./Models/roles");
const HolidaysRouter = require("./Models/holidays");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/auth", authRouter)
app.use("/pass", passRouter);
app.use("/attendance",Attendence);
app.use("/roles", rolesRouter);
app.use("/holidays", HolidaysRouter);

app.use((req, res, next) => {
  console.log("➡️ Incoming request:", req.method, req.url);
  next();
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
