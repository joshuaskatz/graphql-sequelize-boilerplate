import getUserId from '../utils/getUserId';

export const Query = {
	fish: (parent, args, { models }) => {
		return models.Fish.findAll();
	},
	flies: (parent, args, { models }) => {
		return models.Fly.findAll();
	},
	profile: async (parent, args, { models }) => {
		return models.Profile.findAll();
	},
	river: (parent, args, { models }) => {
		return models.River.findAll();
	},
	tackle: async (parent, args, { models }) => {
		return models.Tackle.findAll();
	},
	myTackle: async (parent, args, { models, request }) => {
		const userId = getUserId(request);

		return models.Tackle.findAll({ where: { userId } });
	},
	trip: (parent, args, { models }) => {
		return models.Trip.findAll();
	},
	myTrips: async (parent, args, { models, request }) => {
		const userId = getUserId(request);

		return models.Trip.findAll({ where: { userId } });
	},
	user: async (parent, args, { models }) => {
		return models.User.findAll({
			include: [
				{ model: models.Profile, attributes: [ 'userId' ] },
				{ model: models.Trip, attributes: [ 'userId' ] },
				{ model: models.Tackle, attributes: [ 'userId' ] }
			]
		});
	},
	me: async (parent, args, { models, request }) => {
		const id = getUserId(request);

		return models.User.findByPk(id);
	}
};
