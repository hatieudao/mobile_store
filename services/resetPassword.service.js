const { models } = require('../models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcryptjs");
exports.updatePassword = async (id, newPassword) => {
  try {
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const status = await models.users.update({
      password: hashPassword
    },
      {
        where: {
          id: id
        }
      });
    return status;
  } catch (error) {
    throw new Error('error update');
  }
}
