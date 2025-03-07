const express = require("express");
const connectDb = require("./config/database");
const { connectMail} = require("./config/mailer");
const router = require("../Backend/routes/authroute");
const contactrouter = require("../Backend/routes/contactroute");
const filerouter = require('../Backend/routes/fileroute');
const { connectCloud } = require('../Backend/config/cloudinary');
const fileUpload = require('express-fileupload');
const cors = require("cors");
const app = express();

app.use(cors());

connectDb();
connectMail();
connectCloud();

app.use(fileUpload(
  {
      useTempFiles : true,
      tempFileDir : '/tmp/'
  }
));  
  
app.use(express.json());
app.use("/user", router);
app.use('',contactrouter);
app.use('/user',filerouter);

app.listen(3000, () => {
  console.log("server statrted successfully");
});
