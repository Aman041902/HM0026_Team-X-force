const express = require("express");
const connectDb = require("./config/database");
const { connectMail} = require("./config/mailer");
const router = require("../Backend/routes/authroute");
const contactrouter = require("../Backend/routes/contactroute");
const cors = require("cors");
const app = express();

app.use(cors());

connectDb();
connectMail();
 
app.use(express.json());
app.use("/user", router);
app.use('',contactrouter);

app.listen(3000, () => {
  console.log("server statrted successfully");
});
