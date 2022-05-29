const mongoose = require("mongoose");

const dbCon = async () => {
    try{
        await mongoose.connect("mongodb+srv://paresh:paresh123@mern-blog.tk8mkxq.mongodb.net/?retryWrites=true&w=majority")
        console.log("Connection Successfull");
    }catch(err){
        console.log(`Error ${err.message}`);
    }
}
// ,{
//     useCreateIndex: true,
//     useFindAndModify: true,
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// }
module.exports = dbCon