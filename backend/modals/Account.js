
const mongoose = require('mongoose')
const { Schema } = mongoose;

function formatDate(date) {
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const day = String(date.getDate()).padStart(2, '0');
   return `${year}-${month}-${day}`;
}


const AccountSchema = new Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   name: {
      type: String
   },
   note: {
      type: String
   },
   status: {
      type: String
   },
   money: {
      type: Number,
      default: 0,
      require: true
   },
   date: {
      type: String,  // Store the date as a string
      default: formatDate(new Date())
   }
});

// Pre-save middleware to format the date before saving
AccountSchema.pre('save', function(next) {
   if (this.isModified('date') || this.isNew) {
      this.date = formatDate(new Date());
   }
   next();
});

module.exports = mongoose.model("Account", AccountSchema)
