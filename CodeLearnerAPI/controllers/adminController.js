// initializing the admin model
const adminService = require("../services/adminService");

// for fetching admin
const fetchAdmin = async (req, res) => {
  try {
    const { id } = req.user;
    const admin = await adminService.fetchAdminById(id);

    return res
      .status(200)
      .send({ msg: "Admin fetched sucessfully", data: admin });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error!", error });
  }
};

const updateAdminPassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { password, currentPassword } = req.body;

    const admin = await adminService.updateAdminPassword(
      id,
      password,
      currentPassword
    );

    if (!admin) {
      return res.status(401).send({
        msg: "Failed to update password!",
        error: "Internal Server Error",
      });
    }

    return res.status(200).send({ msg: `Password updated sucessfully`, admin });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error!", error });
  }
};

module.exports = {
  fetchAdmin,
  updateAdminPassword,
};
