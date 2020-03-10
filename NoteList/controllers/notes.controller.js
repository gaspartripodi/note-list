// --Require-- //

const Note = require('../models/Note');
const UserSession = require('../models/UserSession');

// --Notes controller-- //

const notesCtrl = {};

notesCtrl.getNotes = async (req, res) => {
    const token = req.params.token;
    const filter = req.params.filter;
    const order = req.params.order;
    const data = {
        "_id": token
    }
    try {
        const userSession = await UserSession.findOne(data);
        const { userId } = userSession;
        const data2 = {
            "userId": userId
        }

        var notes = [];
        notes = await Note.find(data2).sort( { [filter]: order } );
        res.json(notes);
    }
    catch (err) {
        console.log(err);
        res.json({
            "success": false,
            "message": "Server error"
        });
    }
}

notesCtrl.createNote = async (req, res) => {
    const { title, content, author, date, token } = req.body;
    const data = {
        "_id": token
    }
    try {
        const userSession = await UserSession.findOne(data);
        const { userId } = userSession;
        const newNote = new Note({
            "title": title,
            "content": content,
            "author": author,
            "date": date,
            "userId": userId
        });
        await newNote.save();
        res.json({
            "success": true,
            "message": "Note saved"
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

notesCtrl.getNote = async (req, res) => {
    const id = req.params.id;
    try {
        const note = await Note.findById(id);
        res.json(note);
    }
    catch (err) {
        console.log(err);
        res.json({
            "success": false,
            "message": "Server error"
        });
    }
}

notesCtrl.updateNote = async (req, res) => {
    const id = req.params.id;
    const { title, content, author, date } = req.body;
    try {
        await Note.findByIdAndUpdate(id, {"title": title, "content": content, "author": author, "date": date});
        res.json({
            "success": true,
            "message": "Note updated"
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
notesCtrl.deleteNote = async (req, res) => {
    const id = req.params.id;
    try {
        await Note.findByIdAndDelete(id);
        res.json({
            "success": true,
            "message": "Note deleted"
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

module.exports = notesCtrl;