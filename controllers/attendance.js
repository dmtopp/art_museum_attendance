var express    = require('express'),
    controller = express.Router(),
    mongoose   = require('mongoose'),
    Attendance = require('../models/Attendance'),
    path       = require('path');

controller.route('/new')
  .post(function(req, res, next) {
    var attendanceData = {
      type: req.body.type,
      date: Date.now()
    }

    var message;
    var beginningOfToday = new Date().setHours(0, 0, 0, 0);
    var endOfToday = new Date().setHours(23, 59, 59, 999);

    console.log('begin', beginningOfToday);
    console.log('end', endOfToday);

    Attendance.create(attendanceData)
      .then(function(err, attendance) {
        return Attendance.find({ "date" : { "$gte": beginningOfToday, "$lt": endOfToday } });
      })
      .then(function(dates) {
        message = 'Success!  New attendance created.';
        res.json({
          message: message,
          attendance: dates
        });
      });
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

controller.route('/buttons')
  .get(function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/buttons.html'));
  })

module.exports = controller;
