const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  username:{
    type:String,
    unique: true,
    required: true,
  },

  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
 }, {
    timestamps: true,
});

module.exports = mongoose.model("users", userSchema);
