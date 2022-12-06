// initializing the user model
const User = require("../models/userModel"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken");

// for adding user
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body,
      emailExistence = await User.findOne({ email }).select("+password");

    if (!emailExistence) {
      return res.status(400).send({ msg: "Invalid username or email!" });
    }

    const checkPassword = await bcrypt.compare(
      password,
      emailExistence.password
    );

    if (!checkPassword) {
      return res.status(400).send({ msg: "Wrong password!" });
    }

    const tokenData = {
        user: {
          id: emailExistence._id,
        },
      },
      token = jwt.sign(tokenData, process.env.SECRET_KEY);

    return res.status(200).send({ msg: "Login sucessful!", token });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error!", error });
  }
};

module.exports = { userLogin };
