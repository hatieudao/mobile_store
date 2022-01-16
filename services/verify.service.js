const { models } = require('../models');
exports.verifyUser = async (id) => {
  try {
    await models.users.update({
      status: 'unlock',
    },
      {
        where: {
          id: id,
        }
      });
  } catch (error) {
    throw new Error('error verify');
  }
}
