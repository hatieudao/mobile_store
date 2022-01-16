const nodemailer = require('nodemailer');

exports.sendEmailVerify = (email) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SERVER_EMAIL,
      pass: process.env.SERVER_pass
    }
    // ,
    // tls: {
    //   rejectUnauthorized: false
    // }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Nodemailer Contact" ${process.env.SERVER_EMAIL}`, // sender address
    to: email, // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: '<h1>Hello</h1>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return 'Email has been sent';
  });
}
