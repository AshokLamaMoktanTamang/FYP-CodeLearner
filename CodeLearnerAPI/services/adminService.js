const Admin = require("../models/adminModel"),
  bcrypt = require("bcryptjs");

const fetchAdminById = async (id) => {
  const admin = await Admin.findById(id);

  if (!admin) {
    throw "Admin doesn't exist";
  }

  return admin;
};

const updateAdminPassword = async (id, password, currentPassword) => {
  const exist = await Admin.findById(id).select("+password");

  if (!exist) {
    throw "Admin doesn't exist";
  }

  const checkPassword = await bcrypt.compare(currentPassword, exist.password);

  if (!checkPassword) {
    throw "Invalid Current Password";
  }

  const salt = await bcrypt.genSalt(10),
    newPassword = await bcrypt.hash(password, salt);

  const admin = await Admin.findByIdAndUpdate(id, {
    password: newPassword,
    hasInitialPassword: false,
  });

  if (!admin) {
    throw "Failed to update password";
  }

  return admin;
};

module.exports = {
  fetchAdminById,
  updateAdminPassword,
};
