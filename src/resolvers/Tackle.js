export const Tackle = {
	author: async (parent, args, { models }) => {
		return models.User.findByPk(parent.userId);
	},
	trip: async (parent, args, { models }) => {
		const tripTacklePromise = models.TripTackle.findAll({
			attributes: [ 'tripId' ],
			where: { tackleId: parent.id }
		});

		const [ trip ] = await Promise.all([ tripTacklePromise ]);

		return trip.map(async ({ tripId }) => {
			return models.Trip.findOne({ where: { id: tripId } });
		});
	}
};
