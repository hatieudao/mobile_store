const commentService = require('../../services/commentService');
const userService = require('../../services/userServices');
const {models} = require("../../models");

module.exports.comment = async (req, res, next) => {
    const mobileId = req.params.mobileId;


    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;


    let allComments = await commentService.findAndCountAllCommentByMobileId(mobileId, limit, page);
    const comments = allComments.rows;
    const count = allComments.count;

    for (let comment of comments){
        const user_id = comment.user_id;
        const user = await userService.getUserbyId(user_id);

        //set avatar default
        if (user.avatar === null){
            user.avatar = 'https://icons.iconarchive.com/icons/papirus-team/papirus-status/256/avatar-default-icon.png';
        }
        comment.user = user;
    }

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.json({comments, pagination});
}

module.exports.addComment = async (req, res, next) => {
    const comment = await commentService.addComment(req.body);
    res.json(comment);
}

