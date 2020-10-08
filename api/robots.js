const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const checkAuth = require("./middleware/check-auth");

const api_backend = process.env.API_BACKEND;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("", checkAuth, async (req, res) => {
  const { id: user_id } = req.userData;

  try {
    const { data: site } = await axios.get(`${api_backend}/sites`, {
      params: {
        admin: user_id
      }
    });

    const file_path = `./robots/${site[0].name}/robots.txt`;

    let content = "";
    if (fs.existsSync(file_path)) {
      content = fs.readFileSync(file_path).toString();
    }
    res.send(content);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("", checkAuth, async (req, res) => {
  const { id: user_id } = req.userData;
  const { content } = req.body;

  try {
    const { data: site } = await axios.get(`${api_backend}/sites`, {
      params: {
        admin: user_id
      }
    });

    const file_path = `./robots/${site[0].name}/robots.txt`;

    let dir = path.dirname(file_path);
    fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(file_path, content);

    res.send("OK");
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = {
  path: "/api/robots",
  handler: app
};
