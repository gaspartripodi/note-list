// --Require-- //

//mongoose: to model our data
const { Schema, model } = require('mongoose');

// --Code-- //

const noteSchema = new Schema({
    "title": String,
    "content": String,
    "author": String,
    "date": {
        type: Date,
        default: Date.now
    },
    "userId": {
        "type": String,
        "required": true
    }
}, {
    "timestamps": true
});

// --Exports-- //

//Creating a collection
module.exports = model("note", noteSchema);