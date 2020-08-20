export const Profile = {
	author: async (parent, args, { loaders }) => {
		return loaders.users.load(parent.userId);
	}
};
