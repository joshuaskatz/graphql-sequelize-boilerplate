export const Trip = {
	author: async (parent, args, { models }) => {
		return models.User.findByPk(parent.userId);
	},
	river: async (parent, args, { models }) => {
		return models.River.findByPk(parent.riverId);
	},
	fish: async (parent, args, { models }) => {
		const tripFishPromise = models.TripFish.findAll({
			attributes: [ 'fishId' ],
			where: { tripId: parent.id }
		});

		const [ fish ] = await Promise.all([ tripFishPromise ]);

		return fish.map(async ({ fishId }) => {
			return models.Fish.findOne({ where: { id: fishId } });
		});
	},
	flies: async (parent, args, { models }) => {
		const tripFlyPromise = models.TripFly.findAll({
			attributes: [ 'flyId' ],
			where: { tripId: parent.id }
		});

		const [ flies ] = await Promise.all([ tripFlyPromise ]);

		return flies.map(async ({ flyId }) => {
			return models.Fly.findOne({ where: { id: flyId } });
		});
	},
	tackle: async (parent, args, { models }) => {
		const tripTacklePromise = models.TripTackle.findAll({
			attributes: [ 'tackleId' ],
			where: { tripId: parent.id }
		});

		const [ tackle ] = await Promise.all([ tripTacklePromise ]);

		return tackle.map(({ tackleId }) => {
			return models.Tackle.findOne({ where: { id: tackleId } });
		});
	}
};
