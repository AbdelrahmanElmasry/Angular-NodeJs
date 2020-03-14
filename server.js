const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');
const hbs = require('handlebars')
var path = require('path');

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

app.listen(port, function () {
  console.log('Express started on port: ', port);
});
app.get('/',(req,res)=>{
  res.send("server is working")
})
const transporter = nodemailer.createTransport({

  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: 'f42aac4b72ecb2', // Enter here email address from which you want to send emails
    pass: '038ebfaf25c570' // Enter here password for email account from which you want to send emails
  },
  ssl: false,
  tls: true,
});



app.use(bodyParser.json());

app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var source = fs.readFileSync(path.join(__dirname, './views/index.handlebars'), 'utf8');
// Create email generator
var template = hbs.compile(source);
app.post('/send', function (req, res) {
    console.log("data",req.body.to);
  let senderName = req.body.name;
  let senderEmail = req.body.to;
  let messageSubject = req.body.name;
  let messageText = req.body.message;
  let copyToSender = req.body.contactFormCopy;
  let img = "data:image/png;base64,"+base64_encode('src/assets/mail.jpg');
  var handlebarsOptions = {
    extName:'.hbs', /* or '.handlebars' */
    viewPath:__dirname+'/views',
    layoutsDir:__dirname+'/view',
    defaultLayout:'index',
    partialsDir:__dirname+'/views/partials/'
};

  let mailOptions = {
    to: [senderEmail],
    from: senderName,
    subject: "messageSubject",
    text: messageText,
    replyTo: 'abdelrhmanelmasry@gmail.com',
    html: template({senderName,messageText,img}),
    //`<strong>${messageText}</strong><img src="cid:12345" alt="test image" />`,
    template:'index',
    files: [
      {
        filename: 'test image',
        contentType: 'image/jpeg',
        cid: '12345',
        content: base64_encode('src/assets/mail.jpg'),
        disposition: 'inline'
      }
    ]
  };

  if (senderName === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }

  if (senderEmail === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }

  if (messageSubject === '') {
    res.status(400);
    res.send({
    message: 'Bad request || subject'
    });
    return;
  }

  if (messageText === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }

  if (copyToSender) {
    mailOptions.to.push(senderEmail);
  }

  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error.message);
      res.status(400).end('error');
    } else {
      console.log('Message sent: ', response);
      res.end('sent');
    }
  });
});

