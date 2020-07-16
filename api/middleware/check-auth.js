const axios = require("axios");
const api_backend = process.env.API_BACKEND || "https://api.tian-lp.ru:443";

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const { data } = await axios.get(api_backend + "/users/me", {
      headers: {
        Authorization: token
      }
    });
    req.userData = data;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
};
