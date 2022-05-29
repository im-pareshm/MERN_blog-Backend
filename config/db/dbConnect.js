const mongoose = require("mongoose");

const dbCon = async () => {
    try{
        await mongoose.connect(process.env.DB_URL)
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