const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const checkAuth = require("./middleware/check-auth");

const api_backend = process.env.API_BACKEND || "https://api.tian-lp.ru:443";
const admin_token = process.env.ADMIN_TOKEN;

const app = express();

app.use(bodyParser.json());

app.post("/pages", checkAuth, async (req, res) => {
  const { site_id, slug } = req.body;
  const { id: user_id } = req.userData;
  const token = req.header("Authorization");

  try {
    // получение сайта
    const { data: site } = await axios.get(`${api_backend}/sites/${site_id}`, {
      params: {
        token: admin_token
      }
    });

    // проверка принадлежности
    if (site.admin == user_id) {
      // добавление страницы
      const { data: page } = await axios.post(
        `${api_backend}/pages`,
        {
          head: {},
          admin: user_id
        },
        {
          params: {
            token: admin_token
          }
        }
      );
      // обновление сайта
      site.pages.push({
        slug: slug,
        page: page.id
      });
      const { data: update_site } = await axios.put(
        `${api_backend}/sites/${site.id}`,
        site,
        {
          params: {
            token: admin_token
          }
        }
      );
      res.send({
        status: true,
        data: update_site
      });
    } else {
      res.send({
        status: false,
        message: "Deny access"
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = {
  path: "/api/sites",
  handler: app
};
