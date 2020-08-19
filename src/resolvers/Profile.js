export const Profile = {
	author: async (parent, args, { models }) => {
		return models.User.findByPk(parent.userId);
	}
};
