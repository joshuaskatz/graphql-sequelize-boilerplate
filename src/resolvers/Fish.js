export const Fish = {
	rivers: async (parent, args, { models }) => {
		const riverFishPromise = models.RiverFish.findAll({
			attributes: [ 'riverId' ],
			where: { fishId: parent.id }
		});

		const [ rivers ] = await Promise.all([ riverFishPromise ]);

		return rivers.map(async ({ riverId }) => {
			return models.River.findOne({ where: { id: riverId } });
		});
	}
};
