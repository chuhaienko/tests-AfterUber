'use strict';

module.exports = {
	description: 'List prices',

	validate: function (joi) {
		return {
			query: joi.object().keys({
				latFrom: joi.number().required(),
				lngFrom: joi.number().required(),
				latTo:   joi.number().required(),
				lngTo:   joi.number().required()
			})
		};
	},

	handler: async function (req) {
		try {
			const resp = await this.after.getPrices(req.query);

			return resp;
		} catch (err) {
			throw new this.AppError({
				code:    400,
				message: 'Service temporary unavailable'
			});
		}
	}
};
