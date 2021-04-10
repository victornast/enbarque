'use strict';

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async ({ receiver, subject, body }) => {
  const result = await transport.sendMail({
    from: process.env.EMAIL_ADDRESS,
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
