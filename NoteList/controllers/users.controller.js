// --Require-- //

const User = require('../models/User');
const UserSession = require('../models/UserSession');

// --Users controller-- //

const usersCtrl = {};

usersCtrl.signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName) {
        res.json({
            "success": false,
            "message": "First name cannot be blank"
        });
    }
    if (!lastName) {
        res.json({
            "success": false,
            "message": "Last name cannot be blank"
        });
    }
    if (!email) {
        res.json({
            "success": false,
            "message": "Email cannot be blank"
        });
    }
    if (!password) {
        res.json({
            "success": false,
            "message": "Password cannot be blank"
        });
    }

    const emailLowerCase = email.toLowerCase();

    try {
        const newUser = new User({
            "firstName": firstName,
            "lastName": lastName,
            "email": emailLowerCase
        });
        newUser.password = newUser.generateHash(password);

        await newUser.save();

        //Success scenario
        const user = await User.findOne(newUser);
        const userSession = new UserSession();
        userSession.userId = user._id;
        const doc = await userSession.save();
        res.json({
            "success": true,
            "message": "User created. Welcome " + firstName + "!",
            "token": doc._id
        });
    }
    catch (err) {
        console.log(err);
        const { code } = err;
        if (code === 11000) {
            res.json({
                "success": false,
                "message": "Account already exists"
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

usersCtrl.signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        res.json({
            "success": false,
            "message": "Email cannot be blank"
        });
    }
    if (!password) {
        res.json({
            "success": false,
            "message": "Password cannot be blank"
        });
    }

    const emailLowerCase = email.toLowerCase();
    data = {
        email: emailLowerCase,
    };

    try {
        const user = await User.findOne(data);

        if (user) {
            if (user.validPassword(password)) {
                //Success scenario
                const userSession = new UserSession();
                userSession.userId = user._id;
                const doc = await userSession.save();
                res.json({
                    "success": true,
                    "message": "Welcome " + user.firstName + "!",
                    "token": doc._id
                });
            }
            else {
                res.json({
                    "success": false,
                    "message": "Incorrect password"
                });
            }
        }
        else {
            res.json({
                "success": false,
                "message": "Incorrect email"
            });
        }
    }
    catch (err) {
        console.log(err);
        res.json({
            "success": false,
            "message": "Server error"
        });
    }
}

usersCtrl.verify = async (req, res) => {
    //Get the token and verify the token is one of a kind and it's not deleted
    const { token } = req.body;
    data = {
        "_id": token,
        "isDeleted": false
    };

    try {
        const user = await UserSession.findOne(data);

        if (user) {
            res.json({
                "success": true,
                "message": "Successful verification",
                "token": token
            });
        }
        else {
            res.json({
                "success": false,
                "message": "Token not found"
            });
        }
    }
    catch (err) {
        console.log(err);
        res.json({
            "success": false,
            "message": "Server error"
        });
    }
}

usersCtrl.logout = async (req, res) => {
    const { token } = req.body;

    data = {
        "_id": token,
        "isDeleted": false
    };

    update = {
        "$set": {
            "isDeleted": true
        }
    };

    try {
        const userSession = await UserSession.findOneAndUpdate(data, update);

        if (userSession) {
            res.json({
                "success": true,
                "message": "Successfully logged out"
            });
        }
        else {
            res.json({
                "success": false,
                "message": "Token not found"
            });
        }
    }
    catch (err) {
        console.log(err);
        res.json({
            "success": false,
            "message": "Server error"
        });
    }
}

usersCtrl.getInfo = async (req, res) => {
    const { token } = req.body;
    const data = {
        _id: token
    }
    try {
        const userSession = await UserSession.findOne(data);
        const { userId } = userSession;
        const data2 = {
            _id: userId
        }
        const user = await User.findOne(data2);
        const { firstName, lastName, email } = user;
        res.json({
            "success": true,
            "info": {
                "firstName": firstName,
                "lastName": lastName,
                "email": email
            }
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

module.exports = usersCtrl;
