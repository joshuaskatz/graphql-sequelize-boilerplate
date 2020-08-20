import getUserId from '../utils/getUserId';

export const Query = {
	profile: async (_, __, { models }) => {
		return models.Profile.findAll();
	},

	user: async (_, __, { models }) => {
		return models.User.findAll();
	},
	me: async (_, __, { models, request }) => {
		const id = getUserId(request);

		return models.User.findByPk(id);
	}
};
