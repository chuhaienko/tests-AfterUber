'use strict';

const helper = require('../../helper');
const expect = require('code').expect;
const qs     = require('querystring');
const nock   = require('nock');


describe('List prices', function () {
	this.timeout(10000);

	before(async () => {
		await helper.start();

	//	nock.recorder.rec();
	});

	after(async () => {
		await helper.stop();
	});

	it('GET /items', async () => {
		nock('https://api.uber.com:443')
		.get(/^\/v1.2\/estimates\/price/)
		.reply(200, {'prices': [{'localized_display_name': 'UberX', 'distance': 6.4, 'display_name': 'UberX', 'product_id': 'fe4b01ac-5e39-47aa-89ba-3c058128ce41', 'high_estimate': 130, 'low_estimate': 105, 'duration': 1020, 'estimate': 'UAH105-130', 'currency_code': 'UAH'}, {'localized_display_name': 'Select', 'distance': 6.4, 'display_name': 'Select', 'product_id': '2603131a-5bab-4d81-846f-29ce1ee569b5', 'high_estimate': 142, 'low_estimate': 115, 'duration': 1020, 'estimate': 'UAH115-142', 'currency_code': 'UAH'}, {'localized_display_name': 'UberBlack', 'distance': 6.4, 'display_name': 'UberBlack', 'product_id': 'fa936407-443e-4963-87e0-8efa082e8c9c', 'high_estimate': 289, 'low_estimate': 236, 'duration': 1020, 'estimate': 'UAH236-289', 'currency_code': 'UAH'}, {'localized_display_name': 'UberVan', 'distance': 6.4, 'display_name': 'UberVan', 'product_id': 'eff1b8c1-8e07-4dcd-a7a6-9b9419af8973', 'high_estimate': 193, 'low_estimate': 157, 'duration': 1020, 'estimate': 'UAH157-193', 'currency_code': 'UAH'}]});

		let query = {
			latFrom: 50.443170,
			lngFrom: 30.521350,
			latTo:   50.431760,
			lngTo:   30.413820,
		};
		let resp = await helper.request('GET', `/prices?${qs.encode(query)}`);

		expect(resp.statusCode).equals(200);
		expect(resp.body).equals([{
			name:      'AfterUberX',
			distance:  6.4,
			duration:  1020,
			priceFrom: 84,
			priceTo:   104,
			currency:  'UAH'
		}, {
			name:      'AfterSelect',
			distance:  6.4,
			duration:  1020,
			priceFrom: 92,
			priceTo:   114,
			currency:  'UAH'
		},	{
			name:      'AfterUberVan',
			distance:  6.4,
			duration:  1020,
			priceFrom: 126,
			priceTo:   154,
			currency:  'UAH'
		}, {
			name:      'AfterUberBlack',
			distance:  6.4,
			duration:  1020,
			priceFrom: 189,
			priceTo:   231,
			currency:  'UAH'
		}]);
	});
});
