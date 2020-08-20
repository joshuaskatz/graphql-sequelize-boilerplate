export const User = {
	profile: async (parent, args, { loaders }) => {
		return loaders.profile.load(parent.id);
	}
};
