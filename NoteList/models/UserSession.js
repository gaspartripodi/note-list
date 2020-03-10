// --Require-- //

//mongoose: to model our data
const { Schema, model } = require('mongoose');

// --Code-- //

const userSessionSchema = new Schema({
    "userId": {
        "type": String,
        "default": ""
    },
    "timestamps": {
        type: Date,
        default: Date.now()
    },
    "isDeleted": {
        type: Boolean,
        default: false
    }
});

// --Exports-- //

//Creating a collection
module.exports = model("userSession", userSessionSchema);

//Note: the trim() method removes whitespace from both ends of a string