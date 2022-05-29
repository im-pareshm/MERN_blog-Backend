const express = require("express");

const app = express();

//For Dynamic Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server is listing on "+ PORT))
