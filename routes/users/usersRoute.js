const express = require("express");
const {userRegister, userLogin} = require("../../controllers/users/usersController");

const usersRoutes = express.Router();

//User Register
usersRoutes.post("/register", userRegister);

//User login
usersRoutes.post("/login", userLogin)


//Fetch all users
usersRoutes.get("/api/users", (req, res)=> {
    res.json({user: "Fetch all users"})
})

module.exports = usersRoutes;