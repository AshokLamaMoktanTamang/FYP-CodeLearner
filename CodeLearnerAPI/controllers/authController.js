// initializing the user model
const User = require("../models/userModel"),
  Token = require("../models/tokenVerification"),
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

    if (!emailExistence.emailVerified) {
      return res.status(400).send({ msg: "Verify your email first!" });
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

const handleUserValidation = async (req, res) => {
  const { userId, token } = req.params,
    userExistence = await User.findById(userId);

  if (!userExistence) {
    return res
      .status(400)
      .send({ msg: "Sorry no user with this email was found!" });
  }

  const tokenExistence = await Token.findOne({
    userId,
  });

  if (!tokenExistence) {
    return res
      .status(400)
      .send({ msg: "Sorry the token is not found or already activated!" });
  }

  const checkToken = await bcrypt.compare(token, tokenExistence.token);
  if (!checkToken) {
    return res.status(400).send({ msg: "Sorry the token is not valid!" });
  }

  if (tokenExistence.expireAt < Date.now()) {
    await User.findByIdAndDelete(userId);
    await Token.findByIdAndDelete(tokenExistence._id);
    return res.status(400).send({ msg: "Sorry the token is already expired!" });
  }

  const user = await User.findByIdAndUpdate(userId, {
    emailVerified: true,
  });

  if (!user) {
    return res.status(400).send({ msg: "Unable to verify this email!" });
  }

  await Token.findByIdAndDelete(tokenExistence._id);
  return res.redirect(`${process.env.FRONTEND_BASE_URL}/registration`);
};

module.exports = { userLogin, handleUserValidation };
