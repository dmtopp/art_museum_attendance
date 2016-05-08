var mongoose = require('mongoose');

var attendanceSchema = new mongoose.Schema({
  type: String,
  date: Date
})

module.exports = mongoose.model("Attendance", attendanceSchema);
