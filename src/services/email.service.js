const nodemailer = require('nodemailer');

const sendMail = async ({ from, to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      name: process.env.EMAIL_NAME,
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({ from, to, subject, html });
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = { sendMail };
