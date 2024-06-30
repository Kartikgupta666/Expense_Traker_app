const mongoose = require("mongoose")

function connectToMongo() {

    mongoose.connect(`mongodb+srv://kartikgangil:00000000@expensetrakerdb.2jerzb3.mongodb.net/`)
        .then(() => {
            console.log("db connected")
        })
        .catch(e => {
            console.log(e)
        })
}

module.exports = connectToMongo