const express = require("express");
const { connection } = require("./db");
const userRouter = require("./routes/user.routes");
const labRouter = require("./routes/lab/lab.routes");
const { UserAuthentication } = require("./middlewares/UserAuthentication");
const downloadFile = require("./routes/downloadfile.routes");
const loginRouter = require("./routes/login.routes");
const refreshRouter = require("./routes/refresh.routes");
const testRouter = require("./routes/tests.routes");
const testGroupRouter = require("./routes/testgroup.routes");
const VerifyToken = require("./middlewares/VerifyToken");
const { SetUser } = require("./middlewares/SetUser");
const app = express();
var cors = require("cors");
const VerifyRefreshToken = require("./middlewares/VerifyRefreshToken");
const activitiesRouter = require("./routes/activitylog/activities.routes");
const dashboardRouter = require("./routes/dashboard/dashboard.routes");

require("dotenv").config();
const port = process.env.PORT;

var allowedOrigins = [
  "http://localhost:4000",
  "https://ajacin-flauro-be.onrender.com",
  "http://localhost:3000",
  "https://kgb5h.csb.app",
];
app.use(express.json());
//for development
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin
//       // (like mobile apps or curl requests)
//       console.log("cors", origin);
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg =
//           "The CORS policy for this site does not " +
//           "allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );
app.use(
  cors({
    origin: "*",
  })
);
app.use(UserAuthentication);
app.get("/", (req, res, next) => {
  try {
    res.send({ message: "API working" });
  } catch (error) {
    next(error);
  }
});
app.use("/login", loginRouter);
app.use("/users", VerifyToken, SetUser, userRouter);
app.use("/download", downloadFile); // download a file
app.use("/refresh-token", VerifyRefreshToken, refreshRouter);

//tests
app.use("/tests", VerifyToken, testRouter);
app.use("/testgroups", VerifyToken, testGroupRouter);

//lab
app.use("/lab", VerifyToken, labRouter);

//Activities log
app.use("/activities", activitiesRouter);

// Dashboard

app.use("/dashboard", dashboardRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log("connected");
  } catch (error) {
    console.log("connection failed", error);
  }
  console.log("connected to port:" + port);
});
