var mongoose = require('mongoose');

var attendanceSchema = new mongoose.Schema({
  type: String,
  date: Number
})

module.exports = mongoose.model("Attendance", attendanceSchema);
