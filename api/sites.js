const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const checkAuth = require("./middleware/check-auth");
const cors = require("cors");

const api_backend = process.env.API_BACKEND;
const admin_token = process.env.ADMIN_TOKEN;

const app = express();

app.use(cors());

app.use(bodyParser.json());

// добавление страницы
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
      res.status(401).send({
        message: "Deny access"
      });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// обновление страницы
app.put("/pages", checkAuth, async (req, res) => {
  const { site_id, page_id, slug } = req.body;
  const { id: user_id } = req.userData;
  const token = req.header("Authorization");
  try {
    // получение сайта
    const { data: site } = await axios.get(`${api_backend}/sites/${site_id}`, {
      params: {
        token: admin_token
      }
    });

    const page = site.pages.find(p => p.id == page_id);

    // проверка принадлежности
    if (site.admin == user_id && page && page.slug != "/") {
      // обновление сайта

      page.slug = slug;

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
      res.status(401).send({
        message: "Deny access"
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// удаление страницы
app.put("/pages/delete", checkAuth, async (req, res) => {
  const { site_id, page_id } = req.body;
  const { id: user_id } = req.userData;
  const token = req.header("Authorization");
  try {
    // получение сайта
    const { data: site } = await axios.get(`${api_backend}/sites/${site_id}`, {
      params: {
        token: admin_token
      }
    });

    const page = site.pages.find(p => p.id == page_id);

    // проверка принадлежности
    if (site.admin == user_id && page && page.slug != "/") {
      // удаление страницы
      await axios.delete(`${api_backend}/pages/${page.page}`, {
        params: {
          token: admin_token
        },
        validateStatus: false
      });

      const index = site.pages.indexOf(page);
      if (index > -1) {
        site.pages.splice(index, 1);
      }
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
      res.status(401).send({
        message: "Deny access"
      });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// обновление деплоя sites
app.put("/deploy/sites", checkAuth, async (req, res) => {});

module.exports = {
  path: "/api/sites",
  handler: app
};
