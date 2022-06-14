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
//Fetch User Profile
//--------------------------------------------------------------

const fetchUserProfile = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const userProfile = await User.findById(id);
    res.json(userProfile);
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

//--------------------------------------------------------------
//Delete Users
//--------------------------------------------------------------

const updateUser = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  validateId(_id);
  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      email: req?.body?.email,
      bio: req?.body?.bio,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
});

//--------------------------------------------------------------
//Update User Password
//--------------------------------------------------------------

const updateUserPassword = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { password } = req?.body;
  validateId(_id);
  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  }

  return;
});

//--------------------------------------------------------------
//Follow User
//--------------------------------------------------------------

const followUser = expressAsyncHandler(async (req, res) => {
  const { followId } = req.body;
  const loginUserId = req.user.id;

  //Check for duplicate follows
  const targetUser = await User.findById(followId);

  const isFollowing = targetUser?.followers?.find(
    (user) => user?.toString() === loginUserId.toString()
  );

  if (isFollowing) throw new Error("You are already following this user");

  //Find the followed user and update followers list
  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
      isFollowing: true,
    },
    { new: true }
  );

  //Update following list of login user
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    { new: true }
  );

  res.json("You have successfully followed the user");
});

//--------------------------------------------------------------
//Unfollow User
//--------------------------------------------------------------

const unfollowUser = expressAsyncHandler(async (req, res) => {
  const { unFollowId } = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(
    unFollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unFollowId },
    },
    { new: true }
  );

  res.json("you have successfull unfollowed this user");
});

//--------------------------------------------------------------
//Unfollow User
//--------------------------------------------------------------

const blockUser = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  validateId(id);
  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true }
  );
  res.json(user)
});

//--------------------------------------------------------------
//Unfollow User
//--------------------------------------------------------------

const unBlockUser = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  validateId(id);
  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    { new: true }
  );
  res.json(user)
});

module.exports = {
  userRegister,
  userLogin,
  fetchAllUsers,
  userDelete,
  fetchUserDetails,
  fetchUserProfile,
  updateUser,
  updateUserPassword,
  followUser,
  unfollowUser,
  blockUser,
  unBlockUser
};
