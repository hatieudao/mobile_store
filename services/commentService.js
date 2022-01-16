const {where} = require('sequelize/dist');
const {models} = require('../models');


exports.getCommentByMobileId = (mobile_id) => {
    return models.comments.findAll(
        {
            where: ({mobile_id}),
            order: [
                ['created_at', 'DESC']
            ],
            raw: true
        }
    )
}


exports.findAndCountAllCommentByMobileId = (mobile_id, limit, page) => {
    return models.comments.findAndCountAll(
        {
            where: ({mobile_id}),
            order: [
                ['created_at', 'DESC']
            ],
            offset: (page - 1) * limit,
            limit: limit,
            raw: true,

        }
    )
}


exports.addComment = async (comment) => {
    const created_at = new Date();
    const maxId = await models.comments.max('id');
    return models.comments.create({
        id: maxId + 1,
        user_id: comment.user_id,
        mobile_id: comment.mobile_id,
        rating: comment.rating,
        body: comment.content,
        update_at: null,
        created_at: created_at
    });
}
