
const { models } = require('../../models');

const uuid = require('uuid');
<<<<<<< HEAD
const bcrypt = require('bcryptjs');



exports.userList = () => {
  const result = models.users.findAll({ raw: true });
  return result;
}

exports.customerUserList = () => {
  const result = models.users.findAll({
    where: ({ role: 'user' }),
    raw: true
  });
  return result;
}

exports.adminUserList = (page, limit, filter) => {
  let options = {
    offset: (page - 1) * limit,
    limit: limit,
    order: [
      ['id', 'ASC'],
    ],
    raw: true,
    where: {
      role: "admin",
    },
  }

  // options.where.role = 'admin';

  if (filter.username) {
    options.where.username = filter.username;
  }

  if (filter.fullName) {
    options.where.full_name = filter.fullName;
  }
  if (filter.phoneNumber) {
    options.where.phone_number = filter.phoneNumber;
  }


  const result = models.users.findAndCountAll(options);
  return result;
=======
const bcrypt = require('bcrypt');
const {Op} = require("sequelize");
const brandService = require("./admin.brand.service");



exports.userList = async (page, limit, filter, raw = false) => {
    let options = {
        order: [
            ['id', 'ASC'],
        ],
        where: {
            role: "user",
        },
        raw: raw
    }

    if(limit && page){
        options.offset = (page - 1) * limit;
        options.limit = limit;
    }

    if(filter){
        if (filter.userId){
            options.where.id = filter.userId;
        }

        if (filter.userFullName){
            options.where.username = filter.userFullName;
        }

        if (filter.userPhoneNumber){
            options.where.full_name = filter.userPhoneNumber;
        }
        if (filter.userUserName){
            options.where.phone_number = filter.userUserName;
        }

        if(filter.status){
            options.where.status = filter.status
        }

        // if(filter.minCreatedDate && filter.maxCreatedDate) {
        //     options.where.created_at = {
        //         // [Op.between]: [filter.minCreatedDate, filter.maxCreatedDate]
        //         [Op.gte]: filter.minCreatedDate,
        //         [Op.lte]: filter.maxCreatedDate
        //     };
        // }
    }


    const result = models.users.findAndCountAll(options);
    return result;
}

exports.lockUser = async (userId) => {
    const user = await this.findUserById(userId);
    user.update({
        status: "lock"
    })
}

exports.findUserById = (id, raw = false) => {

    const result = models.users.findOne({
        where: {
            id: id,
            role: "user"
        },
        raw: raw
    });
    return result;
}


exports.adminUserList = async (page, limit, filter, raw = false) => {
    let options = {
        order: [
            ['id', 'ASC'],
        ],
        where: {
            role: "admin",
        },
        raw: raw
    }

    if(limit && page){
        options.offset = (page - 1) * limit;
        options.limit = limit;
    }

    if(filter){
        if (filter.adminId){
            options.where.id = filter.adminId;
        }

        if (filter.adminUserName){
            options.where.username = filter.adminUserName;
        }

        if (filter.adminName){
            options.where.full_name = filter.adminName;
        }
        if (filter.adminPhoneNumber){
            options.where.phone_number = filter.adminPhoneNumber;
        }

        if(filter.status){
            options.where.status = filter.status
        }

        if(filter.minCreatedDate && filter.maxCreatedDate) {
            options.where.created_at = {
                // [Op.between]: [filter.minCreatedDate, filter.maxCreatedDate]
                [Op.gte]: filter.minCreatedDate,
                [Op.lte]: filter.maxCreatedDate
            };
        }
    }


    const result = models.users.findAndCountAll(options);
    return result;
>>>>>>> 2c971c93ec995a22b76a3cf7c3ce9ae0c3facf03
}

exports.addAdminUser = async (username, password, full_name, address, avatar, phone_number) => {
  const created_at = new Date();
  const maxId = await models.users.max('id');
  const nextId = maxId + 1;

  const uid = uuid.v4();

  const saltRounds = 5;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  try {
    const user = await models.users.create(
      {
        id: nextId,
        username: username,
        password: hashPassword,
        full_name: full_name,
        address: address,
        avatar: avatar,
        uid: uid,
        phone_number: phone_number,
        created_at: created_at,
        role: "admin"
      }
    );
    return user;
  } catch (error) {
    return false;
  }
}

exports.findAdminUserById = (id, raw = false) => {

<<<<<<< HEAD
  const result = models.users.findOne({
    where: {
      id: id,
      role: "admin"
    }
  });
=======
    const result = models.users.findOne({
        where: {
            id: id,
            role: "admin"
        },
        raw: raw
    });
>>>>>>> 2c971c93ec995a22b76a3cf7c3ce9ae0c3facf03

  return result;

}

exports.findAdminUserByUsername = (username) => {

<<<<<<< HEAD
  const result = models.users.findOne({
    where: {
      username: username,
      role: "admin"
    }
  });

  return result;
=======
    const result = models.users.findOne({
        where: {
            username: username,
            role: "admin"
        }
    });
    return result;
}

exports.findUnlockAdminUserByUsername = (username) => {

    const result = models.users.findOne({
        where: {
            username: username,
            role: "admin",
            status: "unlock"
        }
    });
    return result;
}
>>>>>>> 2c971c93ec995a22b76a3cf7c3ce9ae0c3facf03

exports.lockAdminUser = async (adminUserId) => {
    const adminUser = await this.findAdminUserById(adminUserId);
    adminUser.update({
        status: "lock"
    })
}


exports.updateAdminUser = async(id, phone_number, address, avatar) => {

    const admin = await this.findAdminUserById(id);

    admin.update({
        phone_number: phone_number,
        address: address,
        avatar: avatar
    })

    await admin.save();

    return id;
}

exports.changeAdminPassword = async(id, password) => {
    const saltRounds = 5;
    const hashPassword = await bcrypt.hash(password,saltRounds);

    const admin = await this.findAdminUserById(id);

    admin.update({
        password: hashPassword
    })

    await admin.save();
}



