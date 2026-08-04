const { model } = require("mongoose");
const UsersSchema = require("../schemas/UsersSchema"); // Clean import

const UsersModel = model("user", UsersSchema); // Removed 'new'

module.exports = { UsersModel };