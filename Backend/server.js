const express = require("express");
const connectDb = require("./config/database");
const router = require("../Backend/routes/authroute");
const cors = require("cors");
const app = express();
app.use(cors());

connectDb();

app.use(express.json());
app.use("/user", router);

app.listen(3000, () => {
  console.log("server statrted successfully");
});
