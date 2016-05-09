var express    = require('express'),
    controller = express.Router(),
    mongoose   = require('mongoose'),
    Attendance = require('../models/Attendance'),
    path       = require('path');

controller.route('/new')
  .post(function(req, res, next) {
    console.log(req.body);
    var attendanceData = {
      type: req.body.type,
      date: Date.now()
    }

    var message;
    Attendance.create(attendanceData, function(err, attend) {
      if (err) message = err;
      else message = 'Success!  New attendance created.';
      res.json({
        message: message,
        attendance: attend
      });
    })


  })

controller.route('/all')
  .get(function(req, res, next) {
    Attendance.find(function(err, attends) {
      if (err) console.log(err);
      else res.json(attends);
    })
  })

controller.route('/reports')
  .get(function(req, res, next) {
    // console.log(path.dirname() + '../');
    res.sendFile(path.join(__dirname, '../views/reports.html'));
  })

module.exports = controller;
