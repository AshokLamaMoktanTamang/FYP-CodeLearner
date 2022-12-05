// initializing the user model
const User = require("../models/userModel");

// for adding user
const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const emailExistence = await User.findOne({
      email,
    });

    if (emailExistence) {
      return res.status(403).send({ msg: `${email} already exists!` });
    }

    const user = await User.create({ firstName, lastName, email, password });

    if (user) {
      return res.status(200).send({ msg: `Registration Sucessful!` });
    }

    return res.status(500).send({ msg: "Failed to add user!" });
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
  try {
  } catch (error) {}
};

// update user
const updateUser = async (req, res) => {
  try {
  } catch (error) {}
};

// delete user
const deleteUser = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = { addUser, fetchUser, fetchUserById, updateUser, deleteUser };
