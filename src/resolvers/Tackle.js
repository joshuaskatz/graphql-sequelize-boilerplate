export const Tackle = {
	author: async (parent, args, { loaders }) => {
		return loaders.users.load(parent.userId);
	},
	trip: async (parent, args, { models }) => {
		return models.Trip.findAll({
			include: [ { model: models.Tackle, where: { id: parent.id } } ],
			through: { attributes: [] }
		});
	}
};
