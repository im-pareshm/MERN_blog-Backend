const User = require("../../model/user/User")
const expressAsyncHandler = require("express-async-handler");
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

module.exports = {userRegister}