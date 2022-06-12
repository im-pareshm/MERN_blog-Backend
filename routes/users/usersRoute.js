const express = require("express");
const {
  userRegister,
  userLogin,
  fetchAllUsers,
  userDelete,
  fetchUserDetails,
  fetchUserProfile,
  updateUser,
  updateUserPassword
} = require("../../controllers/users/usersController");
const authToken = require("../../middleware/auth/authToken");

const usersRoutes = express.Router();

//User Register
usersRoutes.post("/register", userRegister);
//User login
usersRoutes.post("/login", userLogin);
//Fetch all users
usersRoutes.get("/", authToken, fetchAllUsers);
//Update User Password
usersRoutes.put("/password", authToken, updateUserPassword);
//Get user Profile
usersRoutes.get("/profile/:id", authToken, fetchUserProfile);
//Delete User
usersRoutes.delete("/:id", userDelete);
//Update User
usersRoutes.put("/:id", authToken, updateUser);
//Get User single user
usersRoutes.get("/:id", fetchUserDetails);

module.exports = usersRoutes;
