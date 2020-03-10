// --Require-- //

//mongoose: to model our data
const { Schema, model } = require('mongoose');

// --Code-- //

const authorSchema = new Schema({
    "name": {
        "type": String,
        "required": true,
        "trim": true,
    },
    "userId": {
        "type": String,
        "required": true
    }
}, {
    "timestamps": true
});

authorSchema.index({ "name": 1, "userId": 1}, { "unique": true });

// --Exports-- //

//Creating a collection
module.exports = model("author", authorSchema);

//Note: the trim() method removes whitespace from both ends of a string