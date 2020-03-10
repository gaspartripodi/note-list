// --Require-- //

const { Router } = require('express');
const router = Router();
//Notes controller
const notesCtrl = require('../controllers/notes.controller');

// --Routes and their methods-- //

router.route("/")
    .post(notesCtrl.createNote);

router.route("/:id")
    .get(notesCtrl.getNote)
    .put(notesCtrl.updateNote)
    .delete(notesCtrl.deleteNote);

router.route("/token/:token/:filter/:order")
    .get(notesCtrl.getNotes);

// --Exports-- //

module.exports = router;