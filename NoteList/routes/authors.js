// --Require-- //

const { Router } = require('express');
const router = Router();
//Authors controller
const { getAuthors, createAuthor, deleteAuthor } = require('../controllers/authors.controller');

// --Routes and their methods-- //

router.route("/")
    .post(createAuthor);

router.route("/:id")
    .delete(deleteAuthor);

router.route("/:token")
    .get(getAuthors);

// --Exports-- //

module.exports = router;