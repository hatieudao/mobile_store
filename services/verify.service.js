const { models } = require('../models');
const { v4: uuidv4 } = require('uuid');
exports.verifyUser = async (id, uid) => {
  try {
    const status = await models.users.update({
      uid: uuidv4(),
      status: 'unlock',
    },
      {
        where: {
          id: id,
          uid: uid,
        }
      });
    console.log(status);
  } catch (error) {
    throw new Error('error verify');
  }
}
