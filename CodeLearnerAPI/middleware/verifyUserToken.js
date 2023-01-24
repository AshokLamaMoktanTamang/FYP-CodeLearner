const jwt = require("jsonwebtoken"),
  secretKey = process.env.SECRET_KEY;

const fetchUser = (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(400).send({ msg: "No token found" });
  }

  try {
    const data = jwt.verify(token, secretKey);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(400).send({ msg: "Looks like the token is decrypted." });
  }
};

module.exports = fetchUser;
