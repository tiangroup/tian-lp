const express = require("express");
const axios = require("axios");
const fileUpload = require("express-fileupload");

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
  const id = req.body.id;
  console.log(req.body);
  const { data: form } = await axios.get(`${api_backend}/forms/${id}`, {
    params: {
      token: admin_token
    }
  });
  res.status(200).send(form);
});

module.exports = {
  path: "/forms",
  handler: app
};
