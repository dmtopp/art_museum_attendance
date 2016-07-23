var express    = require('express'),
    controller = express.Router(),
    mongoose   = require('mongoose'),
    Attendance = require('../models/Attendance'),
    path       = require('path'),
    nodemailer = require('nodemailer'),
    csvWriter  = require('csv-write-stream'),
    fs         = require('fs'),
    schedule   = require('node-schedule');

// task to send .csv in an email every friday
// normally this would live in a different part of the app,
// but out of laziness I'm putting it here because the ORM is already required.

var sendEmail = schedule.scheduleJob('0 0 * * 1', sendCsvEmail);

function sendCsvEmail() {
  var writer = csvWriter();
  var today = new Date();
  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  var transporter = nodemailer.createTransport('smtps://' + process.env.EMAIL + '%40gmail.com:' + process.env.EMAILPWD + '@smtp.gmail.com');
  var mailOptions = {
    from: 'Art Museum Attendance',
    to: process.env.EMAIL_RECIPIENT,
    subject: 'Test mail',
    text: 'Attached is the art musuem attendance for the last week.  Cheers!',
    attachments: [{
      filename: 'Attendance ' + oneWeekAgo.getMonth() + '/' + oneWeekAgo.getDate() + ' to ' + today.getMonth() + '/' + today.getDate() + '.csv',
      path: 'out.csv'
    }]
  }

  oneWeekAgo = Date.parse(oneWeekAgo);
  today = Date.parse(today);

  Attendance.find({ "date" : { "$gte": oneWeekAgo, "$lt": today } })
    .then(function(attends) {
      writer.pipe(fs.createWriteStream('out.csv'));
      attends.forEach(function(attendance) {
        writer.write({ location: attendance.location,
                       user: attendance.user,
                       date: new Date(attendance.date).toString(),
                       type: attendance.type })
      });
      writer.end();

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) console.log('An email error occured!', error);
        else console.log('Email sent successfully!', info);
      });
    }, function(err) {
      console.log('A database error occured!', err);
    })
}


controller.route('/new')
  .post(function(req, res, next) {
    var attendanceData = {
      type: req.body.type,
      date: Date.now(),
      user: req.body.user,
      location: req.body.location
    }

    var message;
    var beginningOfToday = new Date().setHours(0, 0, 0, 0);
    var endOfToday = new Date().setHours(23, 59, 59, 999);

    Attendance.create(attendanceData)
      .then(function(err, attendance) {
        return Attendance.find({ "date" : { "$gte": beginningOfToday, "$lt": endOfToday },
                                 "type" : req.body.type,
                                 "location" : req.body.location,
                                 "user" : req.body.user });
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
    sendCsvEmail();
    Attendance.find(function(err, attends) {
      if (err) console.log(err);
      else {
        res.json(attends);
      }
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
