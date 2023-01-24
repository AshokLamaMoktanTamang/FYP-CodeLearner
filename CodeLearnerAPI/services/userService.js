const User = require("../models/userModel"),
  Token = require("../models/tokenVerification"),
  nodemailer = require("../utils/email"),
  emailVerificationTemplate = require("../utils/verificationTemplate"),
  { v4: uuidv4 } = require("uuid"),
  bcrypt = require("bcryptjs");

const addUser = async (firstName, lastName, email, password) => {
  const emailExistence = await User.findOne({
    email,
  });

  if (emailExistence) {
    throw `${email} already exists!`;
  }

  const salt = await bcrypt.genSalt(10),
    hashedPassword = await bcrypt.hash(password, salt),
    user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

  if (!user) {
    throw "Failed to add user!";
  }

  const userId = user._id.toString(),
    uniqueString = uuidv4() + userId,
    tokenSalt = await bcrypt.genSalt(10),
    tokenHash = await bcrypt.hash(uniqueString, tokenSalt);

  const token = await Token.create({
    userId,
    token: tokenHash,
    expireAt: Date.now() + 21600000,
  });

  if (!token) {
    await User.findByIdAndDelete(userId);
    throw "Failed to pass token!";
  }

  await nodemailer(
    email,
    "Verify your Email",
    emailVerificationTemplate(
      firstName,
      lastName,
      `${process.env.BASE_URL}/api/auth/v1/${uniqueString}/${userId}`
    )
  ).catch((error) => {
    throw error;
  });

  return user;
};

const fetchUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw "User doesn't exist";
  }

  return user;
};

const fetchAllUser = (async = async () => {});

module.exports = { addUser, fetchUserById };
