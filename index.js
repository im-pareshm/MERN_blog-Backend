const express = require("express");
const dotenv = require('dotenv');

const dbCon = require('./config/db/dbConnect');
const usersRoutes = require("./routes/users/usersRoute")
const { errorHandler, notFound} = require("./middleware/error/errorHandler");

dotenv.config();

const app = express();

dbCon()

//MiddleWare
app.use(express.json());
//User registration
app.use("/api/users", usersRoutes);

//Error handler middleware
app.use(notFound);
app.use(errorHandler);

//For Dynamic Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server is listing on "+ PORT))
