const User = require("../../model/user/User")
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken")
//--------------------------------------------------------------
//Register
//--------------------------------------------------------------
const userRegister = expressAsyncHandler(async (req, res) => {
    //console.log(req.body);

    const userExists = await User.findOne({email: req?.body?.email});

    if(userExists) throw new Error("User Already Exists!!");

    try {
        const user = await User.create({
            firstname : req?.body?.firstname,
            lastname : req?.body?.lastname,
            email : req?.body?.email,
            password : req?.body?.password
        })
        res.json(user)
    } catch (error) {
        res.json(error)
    }
//   res.json({ user: "User Registered" });
});

//--------------------------------------------------------------
//User Login
//--------------------------------------------------------------

const userLogin = expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const userFound = await User.findOne({email});
    if(userFound && (await userFound.isPasswordMatched(password))){
        res.json({
            firstname : userFound?.firstname,
            lastname: userFound?.lastname,
            email: userFound?.email,
            profilePhoto: userFound?.profilePhoto,
            isAdmin: userFound?.isAdmin,
            token: generateToken(userFound?._id)
        });
    }else{
        res.status(401);
        throw new Error("Invalid Credentials!!")
    }
})

module.exports = {userRegister, userLogin}