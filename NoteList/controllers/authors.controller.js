// --Require-- //

const Author = require('../models/Author');
const UserSession = require('../models/UserSession');

// --Authors controller-- //

const authorsCtrl = {};

authorsCtrl.getAuthors = async (req, res) => {
    const token = req.params.token;
    const data = {
        "_id": token
    }
    try {
        const userSession = await UserSession.findOne(data);
        const { userId } = userSession;
        const data2 = {
            "userId": userId
        }
        const authors = await Author.find(data2);
        res.json(authors);
    }
    catch (err) {
        console.log(err);
        res.json({
            "success": false,
            "message": "Server error"
        });
    }
}

authorsCtrl.createAuthor = async (req, res) => {
    const { name, token } = req.body;
    const data = {
        "_id": token
    }
    try {
    const userSession = await UserSession.findOne(data);
    const { userId } = userSession;
    const newAuthor = new Author({
        "name": name,
        "userId": userId
    });
        await newAuthor.save();
        res.json({
            "success": true,
            "message": "Author saved"
        });
    }
    catch (err) {
        console.log(err);
        const { code } = err;
        if (code === 11000) {
            res.json({
                "success": false,
                "message": "Author already exists"
            });
        }
        else {
            res.json({
                "success": false,
                "message": "Server error"
            });
        }
    }
}

authorsCtrl.deleteAuthor = async (req, res) => {
    const id = req.params.id;
    try {
        await Author.findByIdAndDelete(id);
        res.json({
            "success": true,
            "message": "Author deleted"
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            "success": false,
            "message": "Server error"
        });
    }
}

// --Exports-- //

module.exports = authorsCtrl;