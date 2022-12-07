// initializing the user model
const User = require("../models/userModel"),
  Token = require("../models/tokenVerification"),
  nodemailer = require("../utils/email"),
  emailVerificationTemplate = require("../utils/verificationTemplate"),
  { v4: uuidv4 } = require("uuid"),
  bcrypt = require("bcryptjs");

// for adding user
const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body,
      emailExistence = await User.findOne({
        email,
      });

    if (emailExistence) {
      return res.status(403).send({ msg: `${email} already exists!` });
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
      return res.status(400).send({ msg: "Failed to add user!" });
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
      return res.status(400).send({ msg: "Failed to pass token!" });
    }

    const mail = nodemailer(
      email,
      "Verify your Email",
      emailVerificationTemplate(
        firstName,
        lastName,
        `${process.env.BASE_URL}/api/auth/v1/${uniqueString}/${userId}`
      )
    ).catch((error) => {
      return res.status(500).send({ msg: "Server failure!", error });
    });

    if (!mail) {
      await Token.findById(token._id);
      await User.findByIdAndDelete(userId);
      return res.status(500).send({ msg: `Unable to send verification code!` });
    }

    return res
      .status(200)
      .send({ msg: `Registration Sucessful, Verify your email address!` });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error!", error });
  }
};

// for fetching user
const fetchUser = async (req, res) => {
  try {
    res.send("hello");
  } catch (error) {}
};

// fetch user by id
const fetchUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (user) {
      return res
        .status(200)
        .send({ msg: "User fetch sucessfully!", data: user });
    }

    return res.status(400).send({ msg: "User not found!" });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error!", error });
  }
};

// update user detail
const updateUserDetail = async (req, res) => {
  try {
    const { id } = req.params,
      userExistence = await User.findById(id);

    if (!userExistence) {
      return res.status(400).send({ msg: "User not found!" });
    }

    const { firstName, lastName } = req.body,
      user = await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
      });

    if (user) {
      return res.status(200).send({ msg: "User updated sucessfully!" });
    }

    return res.status(400).send({ msg: "Invalid Details!" });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error!", error });
  }
};

// update user password
const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params,
      userExistence = await User.findById(id);

    if (!userExistence) {
      return res.status(400).send({ msg: "User not found!" });
    }

    const { password } = req.body,
      salt = await bcrypt.genSalt(10),
      hashedPassword = await bcrypt.hash(password, salt),
      user = await User.findByIdAndUpdate(id, {
        password: hashedPassword,
      });

    if (user) {
      return res.status(200).send({ msg: "Password updated sucessfully!" });
    }

    return res.status(400).send({ msg: "Invalid details!" });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error!", error });
  }
};

// delete user
const deleteUserTemporarily = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, {
      isDeleted: true,
    });

    if (user) {
      return res.status(200).send({ msg: `Deleted Sucessful!` });
    }

    return res.status(400).send({ msg: "Failed to delete user!" });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error!", error });
  }
};

// delete user
const deleteUserPermanently = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (user) {
      return res.status(200).send({ msg: `Deleted Sucessful!` });
    }

    return res.status(400).send({ msg: "Failed to delete user!" });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error!", error });
  }
};

module.exports = {
  addUser,
  fetchUser,
  fetchUserById,
  updateUserDetail,
  updateUserPassword,
  deleteUserTemporarily,
  deleteUserPermanently,
};
