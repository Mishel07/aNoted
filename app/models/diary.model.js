const mongoose = require("mongoose");
const diarySchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    ref: 'users'
  },
  title: {
    type: String,
    required: true,
    default:"MY DIARY"
  },
  description: {
    type: String,
  },
  diary_date:{
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("diary", diarySchema);
