export const User = {
	trips: async (parent, args, { loaders }) => {
		return loaders.trips.load(parent.id);
	},
	tackle: async (parent, args, { loaders }) => {
		return loaders.tackle.load(parent.id);
	},
	profile: async (parent, args, { loaders }) => {
		return loaders.profile.load(parent.id);
	}
};
