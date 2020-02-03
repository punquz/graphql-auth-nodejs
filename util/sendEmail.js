const sgMail = require('@sendgrid/mail');

const sendEmail = async options => {
  sgMail.setApiKey(process.env.SENDGRID_KEY);
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  await sgMail.send(message);
};

module.exports = sendEmail;
