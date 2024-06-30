require('dotenv').config()
const mongoose = require("mongoose")
function connectToMongo() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        console.error("DATABASE_URL is not defined in the .env file.");
        process.exit(1); // Exit the process with an error code
    }
    mongoose.connect(databaseUrl)
        .then(() => {
            console.log("db connected")
        })
        .catch(e => {
            console.log(e)
        })
}

module.exports = connectToMongo