const express = require("express");
const {
  userRegister,
  userLogin,
  fetchAllUsers,
  userDelete,
  fetchUserDetails,
} = require("../../controllers/users/usersController");
const authToken = require("../../middleware/auth/authToken");

const usersRoutes = express.Router();

//User Register
usersRoutes.post("/register", userRegister);
//User login
usersRoutes.post("/login", userLogin);
//Fetch all users
usersRoutes.get("/", authToken, fetchAllUsers);
//Delete User
usersRoutes.delete("/:id", userDelete);
//Get User single user
usersRoutes.get("/:id", fetchUserDetails);

module.exports = usersRoutes;
