const nodemailer = require("nodemailer");
require('dotenv').config();

const email = process.env.LUXMAIL_EMAIL;
const password = process.env.LUXMAIL_EMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: email,
      pass: password,
    },
  });

  async function OtpMailSender(userEmail, OTP) {
    const info = await transporter.sendMail({
      from: `"URL Shortner 👻" <${email}>`,
      to: `${userEmail}`,
      subject: "Hello From URL Shortner: OTP",
      text: `OTP IS ${OTP}`,
      html: `<b>OTP IS ${OTP}</b>`,
    });
  
    console.log("Message sent: %s", info.messageId, email);
  }


module.exports = OtpMailSender;