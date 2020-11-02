const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const e = require("cors");

const api_backend = process.env.API_BACKEND;
const admin_token = process.env.ADMIN_TOKEN;

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
      user.resetPasswordCode = random_gen(10);
      await axios.put(`${api_backend}/users/${user.id}`, user, {
        params: {
          token: admin_token
        }
      });
      res.send({
        status: true
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

    if (user.resetPasswordCode === code) {
      user.resetPasswordCode = null;
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
