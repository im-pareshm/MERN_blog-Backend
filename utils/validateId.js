const mongoose = require('mongoose')

const validateId = id => {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if(!isValid) throw new Error("User Id is not valid or found.");
}

module.exports = validateId;