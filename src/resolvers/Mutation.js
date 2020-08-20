import bcrypt from 'bcryptjs';

import hashPassword from '../utils/hashPassword';
import generateToken from '../utils/generateToken';
import getUserId from '../utils/getUserId';
import { toTitleCase } from '../utils/toTitleCase';

export const Mutation = {
	signup: async (_, { data }, { models, pubsub }) => {
		const { name, email } = data;

		const password = await hashPassword(data.password);

		const user = await models.User.create({
			name: toTitleCase(name),
			email,
			password
		});

		await pubsub.publish('user', {
			user: {
				mutation: 'CREATED',
				data: user
			}
		});

		return user;
	},
	update_user: async (_, { data }, { models, request, pubsub }) => {
		const id = getUserId(request);

		const userExists = await models.User.findOne({ where: { id } });

		if (!userExists) {
			throw new Error("User doesn't exist. Care to create an account?");
		}

		const { name, email } = data;

		const password = await hashPassword(data.password);

		if (data.password) {
			await models.User.update({ password }, { where: { id } });
		}

		await models.User.update({ name, email }, { where: { id } });

		const user = await models.User.findOne({ where: { id } });

		await pubsub.publish('user', {
			user: {
				mutation: 'UPDATED',
				data: user
			}
		});

		return user;
	},
	delete_user: async (_, __, { models, request, pubsub }) => {
		const id = getUserId(request);

		const userExists = await models.User.findOne({ where: { id } });

		if (!userExists) {
			throw new Error("User doesn't exist.");
		}

		await userExists.destroy();

		await pubsub.publish('user', {
			user: {
				mutation: 'DELETED',
				data: userExists
			}
		});

		return userExists;
	},
	login: async (_, { data }, { models }) => {
		const { email, password } = data;

		const user = await models.User.findOne({
			where: { email }
		});

		if (!user) {
			throw new Error('Unable to login');
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			throw new Error('Unable to login');
		}

		return {
			user,
			token: generateToken(user.id)
		};
	},
	create_profile: async (_, { data }, { models, request, pubsub }) => {
		const userId = getUserId(request);

		const profileExists = await models.Profile.findOne({
			where: { userId }
		});

		if (profileExists) {
			throw new Error('You already have a profile! Care to update it?');
		}

		const { bio, location } = data;

		const profile = await models.Profile.create({
			bio,
			location,
			userId
		});

		await pubsub.publish('profile', {
			profile: {
				mutation: 'CREATED',
				data: profile
			}
		});

		return profile;
	},
	update_profile: async (_, { data }, { models, request, pubsub }) => {
		const userId = getUserId(request);

		const profileExists = await models.Profile.findOne({
			where: { userId }
		});

		if (!profileExists) {
			throw new Error("You don't have a profile! Care to create one?");
		}

		const { bio, location } = data;

		await models.Profile.update(
			{
				bio,
				location
			},
			{ where: { userId } }
		);

		const profile = await models.Profile.findOne({ where: { userId } });

		await pubsub.publish('profile', {
			profile: {
				mutation: 'UPDATED',
				data: profile
			}
		});

		return profile;
	},
	delete_profile: async (_, __, { models, request, pubsub }) => {
		const userId = getUserId(request);

		const profileExists = await models.Profile.findOne({
			where: { userId }
		});

		if (!profileExists) {
			throw new Error("You don't have a profile! Care to create one?");
		}

		await profileExists.destroy();

		await pubsub.publish('profile', {
			profile: {
				mutation: 'DELETED',
				data: profileExists
			}
		});

		return profileExists;
	}
};
