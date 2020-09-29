require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sendMail = require("./controllers/sendMail");
const globalErrHandler = require("./middlewares/globalError");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to Contact address foods",
  });
});

app.post("/", (req, res) => {
  const { email, message, name } = req.body;
  const recipient = "devclub57@gmail.com";
  const subject = "Backend Developer Test";
  const content = `<h2 style="display: flex; align-items: center;">Here are the Contact Details</h2>
  <br/>
  <h4>Name: ${name},</p>
  <h4>Email: ${email}</h2>
  <h4>Message: ${message}</h2>
  <h2>Best Regards, <b><span style="color: red;">Igmrrf</span></b> Team.</h5>
`;
  sendMail(recipient, subject, content);
});

app.use("*", (req, res, next) => {
  const error = new CustomError(
    404,
    `Oops. The route ${req.method} ${req.originalUrl} is not recognised`
  );
  next(error);
});

app.use((err, req, res, next) => {
  globalErrHandler(err, req, res, next);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
