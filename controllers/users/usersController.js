const User = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const validateId = require("../../utils/validateId");
//--------------------------------------------------------------
//Register
//--------------------------------------------------------------
const userRegister = expressAsyncHandler(async (req, res) => {
  //console.log(req.body);

  const userExists = await User.findOne({ email: req?.body?.email });

  if (userExists) throw new Error("User Already Exists!!");

  try {
    const user = await User.create({
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
  //   res.json({ user: "User Registered" });
});

//--------------------------------------------------------------
//User Login
//--------------------------------------------------------------

const userLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      id: userFound?._id,
      firstname: userFound?.firstname,
      lastname: userFound?.lastname,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials!!");
  }
});

//--------------------------------------------------------------
//Fetch All Users
//--------------------------------------------------------------

const fetchAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.find({});
    const count = await User.find({}).count();
    res.json({
      userCount: count,
      users: user,
    });
  } catch (err) {
    res.json(err);
  }
});

//--------------------------------------------------------------
//Fetch Single Users Details
//--------------------------------------------------------------

const fetchUserDetails = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//--------------------------------------------------------------
//Delete Users
//--------------------------------------------------------------

const userDelete = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //to check if id is valid
  validateId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
});

module.exports = { userRegister, userLogin, fetchAllUsers, userDelete, fetchUserDetails };
