const express = require("express");
const axios = require("axios");
const fileUpload = require("express-fileupload");
const path = require("path");
const uuid = require("node-uuid");
const fs = require("fs");
const checkAuth = require("./middleware/check-auth");

// Create app
const app = express();

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 20 * 1024 * 1024 },
    abortOnLimit: true
  })
);

app.post("/image", checkAuth, async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded"
      });
    } else {
      const image = req.files.image;

      if (image.mimetype.indexOf("image/") === 0) {
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        /*const filename =
        Math.floor(Math.random() * 1000) +
        "/" +
        Math.floor(Math.random() * 1000) +
        "/" +
        uuid.v4() +
        path.extname(image.name).toLowerCase();
        image.mv("./static/uploads/" + filename);*/

        const catalog = req.body.catalog;

        const filename = uuid.v4() + path.extname(image.name).toLowerCase();
        image.mv("./content/" + filename);

        const old_image = req.body.old_image;
        if (old_image) {
          try {
            fs.unlinkSync("./content/" + old_image);
          } catch (error) {}
        }

        //send response
        res.send({
          status: true,
          message: "File is uploaded",
          data: {
            name: image.name,
            mimetype: image.mimetype,
            size: image.size,
            path: "/" + filename
          }
        });
      } else {
        res.send({
          status: false,
          message: "No image file uploaded"
        });
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

async function downloadImage(url, path) {
  const writer = fs.createWriteStream(path);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream"
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      resolve();
    });

    response.data.on("error", () => {
      reject();
    });
  });
}

app.post("/image-link", checkAuth, async (req, res) => {
  try {
    const image_link = req.body.image_link;

    const filename = uuid.v4() + path.extname(image_link).toLowerCase();

    const data = await downloadImage(image_link, "./content/" + filename);

    const old_image = req.body.old_image;
    if (old_image) {
      try {
        fs.unlinkSync("./content/" + old_image);
      } catch (error) {}
    }

    res.send({
      status: true,
      message: "File is uploaded",
      data: {
        path: "/" + filename
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.post("/image-remove", checkAuth, async (req, res) => {
  const image = req.body.image;
  if (image) {
    try {
      fs.unlinkSync("./content/" + image);
    } catch (error) {}
  }
  res.send({
    status: true,
    message: "File remove"
  });
});

// -- export app --
module.exports = {
  path: "/api/upload",
  handler: app
};
