
const mongoose = require('mongoose')
const { Schema } = mongoose;


const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  accountbalance: {
    type: Number,
    default: 0,
    require: true
  }

});


module.exports = mongoose.model("User", UserSchema)
