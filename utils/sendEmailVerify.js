const nodemailer = require('nodemailer');
const { emailContent, emailResetContent } = require('./email');
exports.sendEmailVerify = async (email, token) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SERVER_EMAIL,
      pass: process.env.SERVER_pass
    }
  });

  let mailOptions = {
    from: `"Mobile Store Verify"`,
    to: email,
    subject: 'Verify Email',
    html: emailContent(`${process.env.DOMAIN}/verify/${token}`)
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return 'Email has been sent';
  });
}

exports.sendEmailResetPassword = async (email, token) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SERVER_EMAIL,
      pass: process.env.SERVER_pass
    }
  });

  let mailOptions = {
    from: `"Mobile Store Reset Password"`,
    to: email,
    subject: 'Reset Password Email',
    html: emailResetContent(`${process.env.DOMAIN}/reset-password/verify/${token}`)
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return 'Email has been sent';
  });
}

