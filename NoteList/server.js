// --Require-- //

//dotenv: is a zero-dependency module that loads environment variables
//from a |.env| file into |process.env|
require('dotenv').config();
const app = require('./app');
require('./database');
require('colors');

// --Code-- //

async function main() {
    await app.listen(app.get("port"));
    console.log((" Server on port " + app.get("port") + " ").bgBlue.white);
}

main();