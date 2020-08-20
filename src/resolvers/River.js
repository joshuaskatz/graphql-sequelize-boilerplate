export const River = {
	fish: async (parent, args, { models }) => {
		return models.Fish.findAll({
			include: [ { model: models.River, where: { id: parent.id } } ],
			through: { attributes: [] }
		});
	},
	flies: async (parent, args, { models }) => {
		return models.Fly.findAll({
			include: [ { model: models.River, where: { id: parent.id } } ],
			through: { attributes: [] }
		});
	}
};
