'use strict';

const {BaseModule} = require('mif');
const request      = require('request-promise');
const _            = require('lodash');


module.exports = class Helpers extends BaseModule {
	async init () {
		const {uber, after, here} = this.app.config.app;

		this.app.after = {
			/**
			 * Return sorted collection of AfterUber prices
			 * @param from
			 * @param to
			 * @returns {Promise<void>}
			 */
			getPrices: async (from, to) => {
				// Fetch Uber prices
				let {prices} = await request({
					method:  'GET',
					url:     `https://api.uber.com/v1.2/estimates/price?start_latitude=${from.lat}&start_longitude=${from.lng}&end_latitude=${to.lat}&end_longitude=${to.lng}`,
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
			},

			geocode: async (address) => {
				let resp = await request({
					method: 'GET',
					url:    `https://geocoder.api.here.com/6.2/geocode.json?app_id=${here.appId}&app_code=${here.appCode}&searchtext=${encodeURIComponent(address)}`,
					json:   true,
				});

				return {
					lat: _.get(resp, 'Response.View.0.Result.0.Location.DisplayPosition.Latitude'),
					lng: _.get(resp, 'Response.View.0.Result.0.Location.DisplayPosition.Longitude'),
				};
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
