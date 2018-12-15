'use strict';

const {BaseModule} = require('mif');
const request      = require('request-promise');


module.exports = class Models extends BaseModule {
	async init () {
		const uber  = this.app.config.app.uber;
		const after = this.app.config.app.after;

		this.app.after = {
			/**
			 * Return sorted collection of AfterUber prices
			 * @param query
			 * @returns {Promise<void>}
			 */
			getPrices: async (query) => {
				// Fetch Uber prices
				let {prices} = await request({
					method:  'GET',
					url:     `https://api.uber.com/v1.2/estimates/price?start_latitude=${query.latFrom}&start_longitude=${query.lngFrom}&end_latitude=${query.latTo}&end_longitude=${query.lngTo}`,
					headers: {
						Authorization: `Token ${uber.serverToken}`
					},
					json: true,
				});

				// Create AfterUber prices
				prices = prices.map((it) => {
					return {
						name:      `${after.namePrefix}${it.display_name}`,
						distance:  it.distance,
						duration:  it.duration,
						priceFrom: Math.round(it.low_estimate * after.priceMultiplier),
						priceTo:   Math.round(it.high_estimate * after.priceMultiplier),
						currency:  it.currency_code,
					};
				});

				// Sort them
				prices.sort((a, b) => {
					return a.priceFrom > b.priceFrom;
				});

				return prices;
			}
		};
	}

	async start () {
		// do nothing
	}

	async stop () {
		// do nothing
	}
};
