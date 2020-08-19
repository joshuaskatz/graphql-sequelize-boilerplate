export const Flies = {
	rivers: async (parent, args, { models }) => {
		const riverFlyPromise = models.RiverFly.findAll({
			attributes: [ 'riverId' ],
			where: { flyId: parent.id }
		});

		const [ rivers ] = await Promise.all([ riverFlyPromise ]);

		return rivers.map(async ({ riverId }) => {
			return models.River.findOne({ where: { id: riverId } });
		});
	}
};
