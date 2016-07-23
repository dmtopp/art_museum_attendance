var express    = require('express'),
    controller = express.Router(),
    mongoose   = require('mongoose'),
    Attendance = require('../models/Attendance'),
    path       = require('path'),
    nodemailer = require('nodemailer');

controller.route('/new')
  .post(function(req, res, next) {
    console.log(req.body);
    var attendanceData = {
      type: req.body.type,
      date: Date.now(),
      user: req.body.user,
      location: req.body.location
    }

    var message;
    var beginningOfToday = new Date().setHours(0, 0, 0, 0);
    var endOfToday = new Date().setHours(23, 59, 59, 999);

    console.log('begin', beginningOfToday);
    console.log('end', endOfToday);

    Attendance.create(attendanceData)
      .then(function(err, attendance) {
        return Attendance.find({ "date" : { "$gte": beginningOfToday, "$lt": endOfToday },
                                 "type" : req.body.type,
                                 "location" : req.body.location,
                                 "user" : req.body.user });
      })
      .then(function(dates) {
        console.log(dates);
        message = 'Success!  New attendance created.';
        res.json({
          message: message,
          attendance: dates
        });
      });
  })

controller.route('/all')
  .get(function(req, res, next) {
    var smtpConfig = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: 'user@gmail.com',
          pass: 'pass'
      }
    };
    var transporter = nodemailer.createTransport('smtps://' + process.env.EMAIL + '%40gmail.com:' + process.env.EMAILPWD + '@smtp.gmail.com');
    var mailOptions = {
      from: 'Art Museum Attendance',
      to: 'dmtopp@gmail.com',
      subject: 'Test mail',
      text: 'Attached is the art musuem attendance for the last week.  Cheers!'
    }

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) console.log(error);
      else console.log(info);
    });

    Attendance.find(function(err, attends) {
      if (err) console.log(err);
      else res.json(attends);
    })
  })

controller.route('/reports')
  .get(function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/reports.html'));
  })

controller.route('/buttons')
  .get(function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/buttons.html'));
  })

module.exports = controller;
