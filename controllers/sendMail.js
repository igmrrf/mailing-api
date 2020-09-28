require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

const sendMail = async (recipient, emailSubject, content) => {
  const msg = {
    to: "devclub57@gmail.com",
    from: "vuetify@vue.com",
    subject: emailSubject,
    html: content,
  };
  try {
    let info = await sgMail.send(msg);
    console.log(`mail sent succcessfully >>> ${info}`);
    return;
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = sendMail;
