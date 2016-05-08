var express    = require('express'),
    controller = express.Router(),
    mongoose   = require('mongoose'),
    Attendance = require('../models/Attendance');

controller.route('/new')
  .post(function(req, res, next) {
    var attendanceData = {
      type: req.body.type,
      date: Date.now()
    }
    Attendance.create(attendanceData, function(err, attend) {
      var message;
      if (err) message = err;
      else message = 'Success!  New attendance created.';
      res.json({
        message: message,
        attendance: attend
      });
    })
  })

module.exports = controller;
