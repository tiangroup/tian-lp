const express = require("express");
const axios = require("axios");
const fileUpload = require("express-fileupload");
const nodemailer = require("nodemailer");
const templayed = require("templayed");
const checkAuth = require("./middleware/check-auth");

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
    const form_id = req.body.id;
    const { data: form } = await axios.get(`${api_backend}/forms/${form_id}`, {
      params: {
        token: admin_token
      }
    });
    if (form && form.mail && form.mail.to) {
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

      const mailTextTpl = "{{#fields}}{{../field}}{{/fields}}";
      const mailText = templayed(mailTextTpl)({
        fields,
        field: function() {
          let value = this.value;
          if (this.type == "check" && value) {
            return `${this.label}\n`;
          }
          return value ? `${this.label}: ${value}\n` : null;
        }
      });

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
        text: mailText
        //html: "<b>Hello world?</b>"
      });
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      // сохранение формы
      await axios.post(
        `${api_backend}/forms-sends`,
        {
          form: form_id,
          admin: form.admin,
          datetime: Date.now(),
          email: form.mail.to,
          data: fields
            .filter(item => item.value)
            .map(item => ({
              name: item.label,
              value: item.value,
              type: item.type
            }))
        },
        {
          params: {
            token: admin_token
          }
        }
      );
    }
    res.send("OK");
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json({ err });
  }
});

app.get("/", checkAuth, async (req, res) => {
  try {
    const { id: user_id } = req.userData;
    const { data: forms } = await axios.get(`${api_backend}/forms`, {
      params: {
        token: admin_token,
        admin: user_id
      }
    });
    res.send(forms);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json({ err });
  }
});

app.get("/items", checkAuth, async (req, res) => {
  try {
    const { id: user_id } = req.userData;
    const form_id = req.query.form;
    const { data: forms } = await axios.get(`${api_backend}/forms-sends`, {
      params: {
        token: admin_token,
        admin: user_id,
        form: form_id,
        _sort: "datetime:DESC"
      }
    });
    res.send(forms);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json({ err });
  }
});

app.get("/items/count", checkAuth, async (req, res) => {
  try {
    const { id: user_id } = req.userData;
    const form_id = req.query.form;
    debugger;
    const { data: count } = await axios.get(
      `${api_backend}/forms-sends/count`,
      {
        params: {
          token: admin_token,
          admin: user_id,
          form: form_id
        }
      }
    );
    res.send({ count });
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json({ err });
  }
});

module.exports = {
  path: "/forms",
  handler: app
};
