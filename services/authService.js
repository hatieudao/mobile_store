const { models } = require('../models');
const { where } = require("sequelize");
const { create } = require("hbs");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');

exports.getUserbyUsername = (username) => models.users.findOne({
  where: { username: username },
  raw: true
});

exports.getUserbyId = (id) => models.users.findOne({ where: { id: id, status: "unlock" }, raw: true });

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
      email: user.email,
      created_at: created_at,
      role: "user",
      status: "unlock"
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

exports.updateUser = async (username, fullName, phoneNumber, address, email) => {
  try {
    await models.users.update({
      full_name: fullName,
      phone_number: phoneNumber,
      address: address,
      email: email
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
