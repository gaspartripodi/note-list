// --Require-- //

const express = require('express');
//cors: to connect React/Frontend with Node.js/Backend
const cors = require('cors');
const app = express();
const path = require('path');

// --Settings-- //

//Accessing the environment variable that contains the PORT data (thx to Dotenv)
app.set("port", process.env.PORT
    ? process.env.PORT
    : 4000);

// --Middlewares-- //

app.use(cors());
app.use(express.json());

// --Static folder-- //

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./client/build")));
    app.get(/^\/(?!api).*/, (req, res) => { //Serving all routes to the react bundle except "/api"
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// --Routes-- REST client used: Insomnia //

app.use("/api/users", require('./routes/users'));
app.use("/api/notes", require('./routes/notes'));
app.use("/api/authors", require('./routes/authors'));

// --Exports-- //

module.exports = app;