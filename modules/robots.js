const { resolve } = require("path");
const axios = require("axios");
const { existsSync, readFileSync, writeFileSync } = require("fs");

export default function() {
  const {
    rootDir,
    srcDir,
    dir: { static: staticDir },
    generate: { dir: generateDir }
  } = this.options;

  const fileName = "robots.txt";

  // generate robots.txt in dist
  this.nuxt.hook("generate:done", async () => {
    const site_name = process.env.SITE_NAME;
    const api_backend = process.env.API_BACKEND || "https://api.tian-lp.ru";
    const generateFilePath = resolve(rootDir, generateDir, fileName);

    try {
      const { data: sites } = await axios.get(`${api_backend}/sites`, {
        params: { name: site_name }
      });
      const content = sites[0].robots || "";
      writeFileSync(generateFilePath, content);
    } catch (error) {
      console.error(error);
    }
  });
}
