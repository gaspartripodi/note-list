// --Require-- //

const { Router } = require('express');
const router = Router();
//Users controller
const usersCtrl = require('../controllers/users.controller');

// --Routes and their methods-- //

router.route("/signup")
    .post(usersCtrl.signUp);

router.route("/signin")
    .post(usersCtrl.signIn);

router.route("/verify")
    .post(usersCtrl.verify);

router.route("/logout")
    .post(usersCtrl.logout);

router.route("/getinfo")
    .post(usersCtrl.getInfo);

// --Exports-- //

module.exports = router;