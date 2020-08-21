const axios = require("axios");
const api_backend = process.env.API_BACKEND;

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const { data } = await axios.get(api_backend + "/users/me", {
      headers: {
        Authorization: token
      }
    });
    req.userData = data;
    res.set("Access-Control-Allow-Origin", "*");
    /*res.set(
      "Access-Control-Allow-Headers",
      "origin, content-type, accept"
    );*/
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
};
