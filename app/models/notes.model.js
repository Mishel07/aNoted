const mongoose = require("mongoose");
const users = require('./user.model');
const notesSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("notes", notesSchema);
