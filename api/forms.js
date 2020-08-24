const express = require("express");
const axios = require("axios");
const fileUpload = require("express-fileupload");
const nodemailer = require("nodemailer");

const api_backend = process.env.API_BACKEND;
const admin_token = process.env.ADMIN_TOKEN;

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 20 * 1024 * 1024 },
    abortOnLimit: true
  })
);

app.post("/", async (req, res) => {
  try {
    // получение формы
    const id = req.body.id;
    const { data: form } = await axios.get(`${api_backend}/forms/${id}`, {
      params: {
        token: admin_token
      }
    });
    if (form.mail && form.mail.to) {
      // разбор полей
      const fields = Array();
      for (let field of form.fields) {
        console.log(field.label + ": " + req.body[field.id]);
        fields.push({
          label: field.label,
          value: req.body[field.id],
          type: field.type
        });
      }

      // отправка сообщения
      let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      let info = await transporter.sendMail({
        from: '"Лендинг" <noreply@tian-lp.ru>',
        to: form.mail.to,
        subject: form.mail.subject,
        text: "Hello world?"
        //html: "<b>Hello world?</b>"
      });
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    res.status(200).send("OK");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = {
  path: "/forms",
  handler: app
};
