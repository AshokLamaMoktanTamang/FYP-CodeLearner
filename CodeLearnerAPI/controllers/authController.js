// initializing the user model
const User = require("../models/userModel"),
  Admin = require("../models/adminModel"),
  PasswordTemplate = require("../utils/PasswordTemplate"),
  OtpTemplate = require("../utils/otpTemplate"),
  nodemailer = require("../utils/email"),
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

const seedAdmin = async (req, res) => {
  try {
    const email = process.env.ADMIN_EMAIL,
      emailExistence = await Admin.findOne({ email });

    if (emailExistence) {
      return res.status(400).send({ msg: "Admin already seeded!" });
    }

    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 12;
    let password = "";

    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }

    const salt = await bcrypt.genSalt(10),
      hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      email,
      name: "Admin",
      password: hashedPassword,
    });

    if (!admin) {
      return res.status(500).send({ msg: "Failed to seed admin!" });
    }

    await nodemailer(
      process.env.ADMIN_EMAIL,
      "Admin Credential",
      PasswordTemplate("Admin", password)
    ).catch((error) => {
      return res.status(500).send({ error });
    });

    return res.status(200).send({ msg: "Admin seeded sucessful!" });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error!", error });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body,
      emailExistence = await Admin.findOne({ email }).select("+password");

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

    const digits = "1234567890";
    let otp = "";
    for (i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    const initializeOtp = await Admin.findByIdAndUpdate(emailExistence._id, {
      otp,
    });

    if (!initializeOtp) {
      return res.status(500).send({ msg: "Failed to initialize otp!", error });
    }

    await nodemailer(
      process.env.ADMIN_EMAIL,
      `One Time Password [${otp}]`,
      OtpTemplate(emailExistence.name, otp)
    ).catch((error) => {
      return res.status(500).send({ error });
    });

    return res.status(200).send({ msg: "Login sucessful!" });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error!", error });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const emailExistence = await Admin.findOne({ email });

    if (!emailExistence) {
      return res.status(400).send({ msg: "Unauthorized user!" });
    }

    if (emailExistence.otp !== otp) {
      return res.status(400).send({ msg: "Invalid Otp!" });
    }

    const tokenData = {
        user: {
          id: emailExistence._id,
        },
      },
      token = jwt.sign(tokenData, process.env.SECRET_KEY);

    return res.status(200).send({ msg: "OTP Verified sucessfully!", token });
  } catch (error) {
    return res.status(500).send({ msg: "Failed to verify OTP!", error });
  }
};

module.exports = {
  userLogin,
  handleUserValidation,
  adminLogin,
  seedAdmin,
  verifyOtp,
};
