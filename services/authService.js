const { models } = require('../models');
const { where } = require("sequelize");
const { create } = require("hbs");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const { add } = require("nodemon/lib/rules");

exports.getUserbyUsername = (username) => models.users.findOne({ where: { username }, raw: true });

exports.register = async (user) => {
  const created_at = new Date();
  const maxId = await models.users.max('id');
  const account = await models.users.findOne({ where: { username: user.username } });
  if (account) {
    throw new Error('Username already registered');
  }

  const hashPassword = await bcrypt.hash(user.password, 10);

  const uid = uuidv4();

  return await models.users.create(
    {
      id: maxId + 1,
      username: user.username,
      password: hashPassword,
      full_name: user.fullName,
      address: user.address,
      phone_number: user.phoneNumber,
      uid: uid,
      created_at: created_at,
      role: "user"
    });
};

exports.addPicture = async (username, linkPicture) => {
  try {
    await models.users.update({
      avatar: linkPicture
    },
      {
        where: {
          username: username
        }
      });
  } catch (error) {
    throw new Error('error update');
  }
}

exports.updateUser = async (username, fullName, phoneNumber, address) => {
  try {
    await models.users.update({
      full_name: fullName,
      phone_number: phoneNumber,
      address: address
    },
      {
        where: {
          username: username
        }
      });
  } catch (error) {
    throw new Error('error update');
  }
}

exports.updatePassword = async (username, newPassword) => {
  const hashPassword = await bcrypt.hash(newPassword, 10);
  try {
    await models.users.update({
      password: hashPassword
    },
      {
        where: {
          username: username
        }
      });
  } catch (error) {
    throw new Error('error update');
  }
}

exports.delAccount = async (username) => {
  try {
    await models.users.destroy({
      where: {
        username: username
      }
    });
  } catch (error) {
    throw new Error('error delete');
  }
}
