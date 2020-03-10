//|IMPORTANT| "sudo mongod" in terminal: to start MongoDB

// --Require-- //

//mongoose: to set up a connection with the database
const mongoose = require('mongoose');

// --Code-- //

//Accessing the environment variable that contains the DB data (thx to Dotenv)
const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : "mongodb://localhost/notelist";

const run = async () => {
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
}

run().catch(error => console.error(error));

const connection = mongoose.connection;

connection.once("open", () => {
    console.log((" DB is connected ").bgRed.white);
});