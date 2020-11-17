const express = require("express");
const axios = require("axios");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const checkAuth = require("./middleware/check-auth");
const cors = require("cors");
const rimraf = require("rimraf");

const api_backend = process.env.API_BACKEND;

// Create app
const app = express();

app.use(cors());

app.use(bodyParser.json());

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 20 * 1024 * 1024 },
    abortOnLimit: true
  })
);

// загрузка нового изображения
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
        const catalog = await getCatalog(req);

        let filename = random_gen(7) + path.extname(image.name).toLowerCase();
        if (req.body.path) {
          filename = req.body.path + "/" + filename;
        }
        let upload_dir = "content";
        if (req.body.upload === "static") {
          upload_dir = "static";
        }
        image.mv(`./${upload_dir}/${catalog}/${filename}`);

        const old_image = req.body.old_image;
        if (old_image) {
          try {
            fs.unlinkSync(`./${upload_dir}/${catalog}/${old_image}`);
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
    res.status(500).json({ err });
  }
});

// загрузка изображения по ссылке
app.post("/image-link", checkAuth, async (req, res) => {
  try {
    const image_link = req.body.image_link;

    let filename = random_gen(7) + path.extname(image_link).toLowerCase();

    if (req.body.path) {
      filename = req.body.path + "/" + filename;
    }
    //const catalog = req.body.catalog;
    const catalog = await getCatalog(req);

    let upload_dir = "content";
    if (req.body.upload === "static") {
      upload_dir = "static";
    }

    const data = await downloadImage(
      image_link,
      `./${upload_dir}/${catalog}/${filename}`
    );

    const old_image = req.body.old_image;
    if (old_image) {
      try {
        fs.unlinkSync(`./${upload_dir}/${catalog}/${old_image}`);
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

// удаление картинки
app.post("/image-remove", checkAuth, async (req, res) => {
  const image = req.body.image;
  const catalog = await getCatalog(req);
  let upload_dir = "content";
  if (req.body.upload === "static") {
    upload_dir = "static";
  }
  if (image) {
    try {
      fs.unlinkSync(`./${upload_dir}/${catalog}/${image}`);
    } catch (error) {}
  }
  res.send({
    status: true,
    message: "File remove"
  });
});

// удаление папки
app.post("/dir-remove", checkAuth, async (req, res) => {
  const dir = req.body.dir;
  const catalog = await getCatalog(req);
  let upload_dir = "content";
  if (req.body.upload === "static") {
    upload_dir = "static";
  }
  if (dir) {
    try {
      rimraf(`./${upload_dir}/${catalog}/${dir}`, function() {});
    } catch (error) {
      console.log(error);
    }
  }
  res.send({
    status: true,
    message: "Dir remove"
  });
});

// получение загрузок раздела
app.get("/section/:id", checkAuth, async (req, res) => {
  const sectionId = req.params.id;
  const catalog = await getCatalog(req);
  const upload_dir = "static";
  const path = `./${upload_dir}/${catalog}/${sectionId}/upload`;
  let files = [];
  try {
    if (fs.existsSync(path)) {
      files = fs
        .readdirSync(path)
        .map(file => ({
          url: `/${catalog}/${sectionId}/upload/${file}`,
          img: `/${sectionId}/upload/${file}`,
          time: fs.statSync(`${path}/${file}`).mtime.getTime()
        }))
        .sort((a, b) => b.time - a.time);
    }
  } catch (error) {
    console.log(error);
  }
  res.send({
    status: true,
    files: files
  });
});

// -- export app --
module.exports = {
  path: "/api/upload",
  handler: app
};

// загрузка изображения по ссылке
async function downloadImage(url, file) {
  var dir = path.dirname(file);
  fs.mkdirSync(dir, { recursive: true });
  const writer = fs.createWriteStream(file);

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

// получение папки сайта для загрузок
async function getCatalog(req) {
  const token = req.header("Authorization");
  const { data } = await axios.get(`${api_backend}/sites`, {
    headers: {
      Authorization: token
    },
    params: {
      admin: req.userData.id
    }
  });
  const catalog = `uploads/${data[0].name}`;
  return catalog;
}

function random_gen(len) {
  const chrs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let str = "";
  for (var i = 0; i < len; i++) {
    var pos = Math.floor(Math.random() * chrs.length);
    str += chrs.substring(pos, pos + 1);
  }
  return str;
}
