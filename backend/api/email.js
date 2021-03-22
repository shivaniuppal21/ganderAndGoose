const Mail = require('../models/mail.model');
const app = require('express').Router();
const nodemailer = require('nodemailer');
module.exports = app;


let transporter = nodemailer.createTransport({
	service: 'Gmail', // Your SMTP
	auth: {
        user: 'testlighthousebootcamp@gmail.com', // Your email id
        pass: 'lighthousetest' // Your password
    }
});

app.post('/send', (req, res)=> {
    if (typeof req.body.to != 'string') {
        res.status(400);
        res.json('sending an email is require the destination address!');
    }

    let mailOptions = {
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };

    transporter.sendMail(mailOptions)
    .then(function(sent) {
        console.log('sent!');
        req.body.from = 'testlighthousebootcamp@gmail.com', // Your email id
        Mail.create(req.body)
        .then(function(created) {
            console.log('created!');
            res.json(created);
        })
        .catch(function(errCreated) {
            console.log(errCreated);
            res.status(400);
            res.json(errCreated);
        });
    })
    .catch(function(errSent) {
        console.log(errSent);
        res.status(400);
        res.json(errSent);
    });
  });

