import DataLoader from 'dataloader';

import models from '../../models';

const batchTripFish = async (ids) => {
	const rowsPromise = models.Fish.findAll({
		include: [ { model: models.Trip, where: { id: ids } } ],
		through: { attributes: [] }
	});

	console.log(ids.map((iD) => rows.filter(({ id }) => id === iD)));
};

export const tripFish = new DataLoader(batchTripFish);
