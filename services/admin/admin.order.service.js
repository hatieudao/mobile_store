
const {models} = require('../../models');

exports.orderList = () => {
    const result = models.orders.findAll({
        include:
            [
                {
                    model: models.users,
                    as: "user"
                },
            ]
    });

    return result;

}