
const {models} = require('../../models');

exports.userList = () => {
    const result = models.users.findAll({raw: true});

    return result;

}