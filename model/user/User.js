const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Creating Schema
const userSchema = new mongoose.Schema({
    firstname: {
        required: [true, "first name is required"],
        type: String
    },
    lastname: {
        required: [true, "last name is required"],
        type: String
    },
    profilePhoto: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    bio: {
        type: String
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    postCount: {
        type: Number,
        default: 0
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["Admin", "Guest", "Blogger"]
    },
    isFollowing: {
        type: Boolean,
        default: false
    },
    isUnFollowing: {
        type: Boolean,
        default: false
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    viewedBy: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    followers: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }
        ]
    },
    following: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }
        ]
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true

})

//Hasing Password
userSchema.pre("save", async function (next){

    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//Check Password
userSchema.methods.isPasswordMatched = async function (pwd){
    return await bcrypt.compare(pwd, this.password);
}

//Compile schema into model
const User = mongoose.model("User", userSchema);

module.exports = User