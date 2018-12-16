'use strict';

module.exports = {
	description: 'List prices',

	validate: function (joi) {
		return {
			query: joi.object().keys({
				addressFrom: joi.string().required(),
				addressTo:   joi.string().required(),
			})
		};
	},

	handler: async function (req, params) {
		try {
			const posFrom = await this.after.geocode(req.query.addressFrom);
			const posTo   = await this.after.geocode(req.query.addressTo);

			const resp = await this.after.getPrices(posFrom, posTo);

			return resp;

		} catch (err) {
			req.logger.error(err.toString());

			throw new this.AppError({
				code:    400,
				message: 'Service temporary unavailable'
			});
		}
	}
};
