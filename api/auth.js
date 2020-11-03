const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const checkAuth = require("./middleware/check-auth");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const api_backend = process.env.API_BACKEND;
const admin_token = process.env.ADMIN_TOKEN;
const smtp = process.env.SMTP;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/forgot", async (req, res) => {
  const { site_id, email } = req.body;
  try {
    // получение сайта
    const { data: site } = await axios.get(`${api_backend}/sites/${site_id}`, {
      params: {
        token: admin_token
      }
    });

    if (!site) throw "Site not found";

    // получение пользователя
    const { data: user } = await axios.get(
      `${api_backend}/users/${site.admin}`,
      {
        params: {
          token: admin_token
        }
      }
    );

    if (!user) throw "User not found";

    if (user.email !== email) {
      res.send({
        status: false,
        msg: "Этот e-mail не существует"
      });
    } else {
      user.resetCode = random_gen(10);
      await axios.put(`${api_backend}/users/${user.id}`, user, {
        params: {
          token: admin_token
        }
      });

      // отправка письма
      let transporter;
      if (smtp) {
        transporter = nodemailer.createTransport({
          host: smtp,
          port: 25,
          secure: false
        });
      } else {
        let testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass
          }
        });
      }
      const mailText = `
        Был запрошен сброс пароля.

        Код сброса: ${user.resetCode}

        Введите его на сайте.
      `;
      let info = await transporter.sendMail({
        from: '"TianLP" <noreply@tian-lp.ru>',
        to: user.email,
        subject: "Сброс пароля",
        text: mailText
      });
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.send({
        status: true,
        msg: "Код сброса отправлен"
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.post("/password-reset", async (req, res) => {
  const { site_id, code, password } = req.body;
  try {
    // получение сайта
    const { data: site } = await axios.get(`${api_backend}/sites/${site_id}`, {
      params: {
        token: admin_token
      }
    });

    if (!site) throw "Site not found";

    // получение пользователя
    const { data: user } = await axios.get(
      `${api_backend}/users/${site.admin}`,
      {
        params: {
          token: admin_token
        }
      }
    );

    if (!user) throw "User not found";

    if (user.resetCode === code) {
      user.resetCode = null;
      user.password = password;
      await axios.put(`${api_backend}/users/${user.id}`, user, {
        params: {
          token: admin_token
        }
      });
      res.send({
        status: true
      });
    } else {
      res.send({
        status: false,
        msg: "Неверный код сброса"
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.post("/password-change", checkAuth, async (req, res) => {
  const { new_password, old_password } = req.body;

  // проверка пароля
  try {
    await axios.post(`${api_backend}/auth/local`, {
      identifier: req.userData.username,
      password: old_password
    });
  } catch (error) {
    res.send({
      status: false,
      msg: "Неверный пароль"
    });
    return;
  }

  try {
    const user = req.userData;
    user.password = new_password;
    await axios.put(`${api_backend}/users/${user.id}`, user, {
      params: {
        token: admin_token
      }
    });
    res.send({
      status: true,
      msg: "Пароль изменён"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.post("/email-change", checkAuth, async (req, res) => {
  const { password, new_email } = req.body;

  // проверка e-mail
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!pattern.test(new_email)) {
    res.send({
      status: false,
      msg: "Неверный e-mail"
    });
    return;
  }

  // проверка пароля
  try {
    await axios.post(`${api_backend}/auth/local`, {
      identifier: req.userData.username,
      password: password
    });
  } catch (error) {
    res.send({
      status: false,
      msg: "Неверный пароль"
    });
    return;
  }

  try {
    const user = req.userData;
    const resetCode = random_gen(10);
    const salt = bcrypt.genSaltSync(10);
    user.resetCode = bcrypt.hashSync(resetCode, salt);
    await axios.put(`${api_backend}/users/${user.id}`, user, {
      params: {
        token: admin_token
      }
    });

    // отправка письма
    let transporter;
    if (smtp) {
      transporter = nodemailer.createTransport({
        host: smtp,
        port: 25,
        secure: false
      });
    } else {
      let testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    }
    const mailText = `
      Была запрошена смена электронного адреса.

      Код подтверждения: ${resetCode}

      Введите его на сайте.
    `;
    let info = await transporter.sendMail({
      from: '"TianLP" <noreply@tian-lp.ru>',
      to: new_email,
      subject: "Смена электронного адреса",
      text: mailText
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send({
      status: true,
      resetCode: resetCode,
      hash: user.resetCode,
      check: bcrypt.compareSync(resetCode, user.resetCode)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.post("/email-confirm", checkAuth, async (req, res) => {
  const { code, new_email } = req.body;
  const user = req.userData;

  if (bcrypt.compareSync(code, user.resetCode)) {
    try {
      user.email = new_email;
      user.resetCode = null;
      await axios.put(`${api_backend}/users/${user.id}`, user, {
        params: {
          token: admin_token
        }
      });
      res.send({
        status: true,
        msg: "E-mail изменен"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  } else {
    res.send({
      status: false,
      msg: "Неверный код подтверждения"
    });
  }
});

function random_gen(len) {
  const chrs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let str = "";
  for (var i = 0; i < len; i++) {
    var pos = Math.floor(Math.random() * chrs.length);
    str += chrs.substring(pos, pos + 1);
  }
  return str;
}

module.exports = {
  path: "/api/auth",
  handler: app
};
