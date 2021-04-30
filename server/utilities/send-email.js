'use strict';

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async ({ sender, receiver, subject, body }) => {
  console.log(sender);
  const result = await transport.sendMail({
    from: `${sender.firstName} ${sender.lastName} <${sender.email}>`,
    to: receiver,
    subject,
    html: `
        <html>
          <head>
            <style>
              a {
                background-color: yellow;
              }
            </style>
          </head>
          <body>
            ${body}
          </body>
        </html>
      `
  });
  return result;
};

module.exports = sendEmail;
