const expressAsyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");
const User = require("../../model/user/User");

const authToken = expressAsyncHandler( async (req, res, next) => {
    let token;

    if(req?.headers?.authorization?.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            if(token){
                const decode = jwt.verify(token, process.env.JWT_KEY);
                //Find User by Id
                const user = await User.findById(decode?.id).select("-password");
                //Attach user to request object
                req.user = user;
                next();
            }
        } catch (error) {
            throw new Error("Not authorized or Expired token, Try to login again");
        }
    }else{
        throw new Error("There is not token Attached");
    }
})

module.exports = authToken;