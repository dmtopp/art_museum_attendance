var mongoose = require('mongoose');

var attendanceSchema = new mongoose.Schema({
  type: String,
  date: Number,
  location: String,
  user: String
})

module.exports = mongoose.model("Attendance", attendanceSchema);
