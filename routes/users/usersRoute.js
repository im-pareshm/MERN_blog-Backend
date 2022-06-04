const express = require("express");
const {userRegister} = require("../../controllers/users/usersController")

const usersRoutes = express.Router();

usersRoutes.post("/register", userRegister);

//User login
usersRoutes.post("/api/users/login", (req, res)=> {
    res.json({user: "User login Successfull"})
})
//Fetch all users
usersRoutes.get("/api/users", (req, res)=> {
    res.json({user: "Fetch all users"})
})

module.exports = usersRoutes;