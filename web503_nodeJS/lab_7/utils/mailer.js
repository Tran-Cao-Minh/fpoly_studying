exports.sendMail = function (
  email = String(),
  subject = String(),
  content = String(),
) {
  const nodemailer = require('nodemailer');

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'trancaominh932016a@gmail.com',
      pass: 'trancaominh932016a@gmail.c',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mainOptions = {
    from: 'TCM Shop',
    to: email,
    subject: subject,
    text: content,
    // html: content // if your content is format as html
  };

  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      throw err;
    };

    console.log(`Send mail to ${email} successfully`);
    console.log(info);
  });
}