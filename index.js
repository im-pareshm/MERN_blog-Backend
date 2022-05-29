const express = require("express");
const dbCon = require('./config/db/dbConnect');

const app = express();

dbCon()

//For Dynamic Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server is listing on "+ PORT))
