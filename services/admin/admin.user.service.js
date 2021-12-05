
const {models} = require('../../models');

const uuid = require('uuid');
const bcrypt = require('bcrypt');



exports.userList = () => {
    const result = models.users.findAll({raw: true});
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

    if (filter.username){
        options.where.username = filter.username;
    }

    if (filter.fullName){
        options.where.full_name = filter.fullName;
    }
    if (filter.phoneNumber){
        options.where.phone_number = filter.phoneNumber;
    }


    const result = models.users.findAndCountAll(options);
    return result;
}

exports.addAdminUser = async (username, password, full_name, address, avatar, phone_number) => {
    const created_at = new Date();
    const maxId = await models.users.max('id');
    const nextId = maxId + 1;

    const uid = uuid.v4();

    const saltRounds = 5;
    const hashPassword = await bcrypt.hash(password,saltRounds);

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

exports.findAdminUserById = (id) => {

    const result = models.users.findOne({
        where: {
            id: id,
            role: "admin"
        }
    });

    return result;

}

exports.findAdminUserByUsername = (username) => {

    const result = models.users.findOne({
        where: {
            username: username,
            role: "admin"
        }
    });

    return result;

}

