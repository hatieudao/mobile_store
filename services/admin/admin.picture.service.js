const { models } = require('../../models');

exports.getPicturesInforByProductId = (producId) => models.pictures.findAll({
    where: ({mobile_id: producId }),
})


exports.getPicturesIdByProductId = async (producId) => {
    const pictureIds = await models.pictures.findAll({
            where: ({mobile_id: producId}),
            attributes: ['id'],
        }
    )

    return pictureIds.map(function (cur){
        return cur.id;
    });

}


exports.addPicture = async (mobile_id, link) => {

    const maxId = await models.pictures.max('id');
    const nextId = maxId + 1;
    const picture = await models.pictures.create({id: nextId, mobile_id: mobile_id, link: link});
    return picture;
}



exports.deletePictureByIds = async (listIds) => {
    models.pictures.destroy(
        {
            where: {
                id: listIds
            }
        }
    );
}