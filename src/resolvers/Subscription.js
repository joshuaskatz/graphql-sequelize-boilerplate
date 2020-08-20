export const Subscription = {
	profile: {
		subscribe: (_, __, { pubsub }) => {
			return pubsub.asyncIterator('profile');
		}
	},
	user: {
		subscribe: (_, __, { pubsub }) => {
			return pubsub.asyncIterator('user');
		}
	}
};
