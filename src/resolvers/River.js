export const River = {
	fish: async (parent, args, { models }) => {
		const riverFishPromise = models.RiverFish.findAll({
			attributes: [ 'fishId' ],
			where: { riverId: parent.id }
		});

		const [ fish ] = await Promise.all([ riverFishPromise ]);

		return fish.map(async ({ fishId }) => {
			return models.Fish.findOne({ where: { id: fishId } });
		});
	},
	flies: async (parent, args, { models }) => {
		const riverFlyPromise = models.RiverFly.findAll({
			attributes: [ 'flyId' ],
			where: { riverId: parent.id }
		});

		const [ flies ] = await Promise.all([ riverFlyPromise ]);

		return flies.map(async ({ flyId }) => {
			return models.Fly.findOne({ where: { id: flyId } });
		});
	}
};
