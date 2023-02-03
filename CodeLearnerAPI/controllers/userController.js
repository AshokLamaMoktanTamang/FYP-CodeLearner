// initializing the user model
const userService = require("../services/userService");

// for adding user
const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body,
      user = await userService.addUser(firstName, lastName, email, password);

    if (!user) {
      return res
        .status(401)
        .send({ msg: "Failed to add user!", error: "Internal Server Error" });
    }

    return res
      .status(200)
      .send({ msg: `Registration Sucessful, Verify your email address!` });
  } catch (error) {
    return res.status(500).send({ msg: "Failed to add user!", error });
  }
};

// for fetching user
const fetchUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userService.fetchUserById(id);

    return res
      .status(200)
      .send({ msg: "User fetched sucessfully", data: user });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error!", error });
  }
};

module.exports = {
  addUser,
  fetchUser,
};
