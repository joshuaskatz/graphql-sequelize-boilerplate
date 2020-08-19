export const User = {
	trips: async (parent, args, { models }) => {
		return models.Trip.findAll({ where: { userId: parent.id } });
	},
	tackle: async (parent, args, { models }) => {
		return models.Tackle.findAll({ where: { userId: parent.id } });
	},
	profile: async (parent, args, { models }) => {
		return models.Profile.findOne({ where: { userId: parent.id } });
	}
};
