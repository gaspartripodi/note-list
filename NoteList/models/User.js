// --Require-- //

//mongoose: to model our data
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// --Code-- //

const userSchema = new Schema({
    "firstName": {
        "type": String,
        "trim": true,
        "default": ""
    },
    "lastName": {
        "type": String,
        "trim": true,
        "default": ""
    },
    "email": {
        "type": String,
        "trim": true,
        "default": "",
        "required": true,
        "unique": true
    },
    "password": {
        "type": String,
        "trim": true,
        "default": "",
        "required": true
    },
    "isDeleted": {
        "type": Boolean,
        "default": false
    }
}, {
    "timestamps": true
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

// --Exports-- //

//Creating a collection
module.exports = model("user", userSchema);

//Note: the trim() method removes whitespace from both ends of a string