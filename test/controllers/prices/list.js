'use strict';

const helper = require('../../helper');
const expect = require('code').expect;
const qs     = require('querystring');
const nock   = require('nock');


describe('List prices', function () {
	this.timeout(10000);

	before(async () => {
		await helper.start();

		// nock.recorder.rec();
	});

	after(async () => {
		await helper.stop();
	});

	it('GET /items', async () => {
		nock('https://api.uber.com:443')
		.get(/^\/v1.2\/estimates\/price/)
		.reply(200, {'prices': [{'localized_display_name': 'UberX', 'distance': 6.4, 'display_name': 'UberX', 'product_id': 'fe4b01ac-5e39-47aa-89ba-3c058128ce41', 'high_estimate': 130, 'low_estimate': 105, 'duration': 1020, 'estimate': 'UAH105-130', 'currency_code': 'UAH'}, {'localized_display_name': 'Select', 'distance': 6.4, 'display_name': 'Select', 'product_id': '2603131a-5bab-4d81-846f-29ce1ee569b5', 'high_estimate': 142, 'low_estimate': 115, 'duration': 1020, 'estimate': 'UAH115-142', 'currency_code': 'UAH'}, {'localized_display_name': 'UberBlack', 'distance': 6.4, 'display_name': 'UberBlack', 'product_id': 'fa936407-443e-4963-87e0-8efa082e8c9c', 'high_estimate': 289, 'low_estimate': 236, 'duration': 1020, 'estimate': 'UAH236-289', 'currency_code': 'UAH'}, {'localized_display_name': 'UberVan', 'distance': 6.4, 'display_name': 'UberVan', 'product_id': 'eff1b8c1-8e07-4dcd-a7a6-9b9419af8973', 'high_estimate': 193, 'low_estimate': 157, 'duration': 1020, 'estimate': 'UAH157-193', 'currency_code': 'UAH'}]});

		nock('https://geocoder.api.here.com:443')
		.get(/^\/6.2\/geocode.json/)
		.reply(200, {'Response': {'MetaInfo': {'Timestamp': '2018-12-16T09:51:58.352+0000'}, 'View': [{'_type': 'SearchResultsViewType', 'ViewId': 0, 'Result': [{'Relevance': 1, 'MatchLevel': 'houseNumber', 'MatchQuality': {'Country': 1, 'City': 1, 'Street': [1], 'HouseNumber': 1}, 'MatchType': 'interpolated', 'Location': {'LocationId': 'NT_t4UV3N.mlkJN4ajN6ykW8A_xA', 'LocationType': 'point', 'DisplayPosition': {'Latitude': 50.4516519, 'Longitude': 30.5265116}, 'NavigationPosition': [{'Latitude': 50.451775, 'Longitude': 30.526425}], 'MapView': {'TopLeft': {'Latitude': 50.4527761, 'Longitude': 30.5247461}, 'BottomRight': {'Latitude': 50.4505278, 'Longitude': 30.5282771}}, 'Address': {'Label': 'Хрещатик вулиця, 1, Київ, 01001, Україна', 'Country': 'UKR', 'County': 'Київ', 'City': 'Київ', 'District': 'Печерський район', 'Street': 'Хрещатик вулиця', 'HouseNumber': '1', 'PostalCode': '01001', 'AdditionalData': [{'value': 'Україна', 'key': 'CountryName'}, {'value': 'Київ', 'key': 'CountyName'}]}}}]}]}})
		.get(/^\/6.2\/geocode.json/)
		.reply(200, {'Response': {'MetaInfo': {'Timestamp': '2018-12-16T09:54:48.971+0000'}, 'View': [{'_type': 'SearchResultsViewType', 'ViewId': 0, 'Result': [{'Relevance': 1, 'MatchLevel': 'houseNumber', 'MatchQuality': {'Country': 1, 'City': 1, 'Street': [1], 'HouseNumber': 1}, 'MatchType': 'pointAddress', 'Location': {'LocationId': 'NT_vNbtrQdBTuyDb5v-9cAMlA_2A9l', 'LocationType': 'point', 'DisplayPosition': {'Latitude': 50.44754, 'Longitude': 30.42225}, 'NavigationPosition': [{'Latitude': 50.44724, 'Longitude': 30.42233}], 'MapView': {'TopLeft': {'Latitude': 50.4486642, 'Longitude': 30.4204846}, 'BottomRight': {'Latitude': 50.4464158, 'Longitude': 30.4240154}}, 'Address': {'Label': 'Вацлава Гавела бульвар, 6З, Київ, 03142, Україна', 'Country': 'UKR', 'County': 'Київ', 'City': 'Київ', 'District': "Солом'янський район", 'Street': 'Вацлава Гавела бульвар', 'HouseNumber': '6З', 'PostalCode': '03142', 'AdditionalData': [{'value': 'Україна', 'key': 'CountryName'}, {'value': 'Київ', 'key': 'CountyName'}]}}}]}]}});

		let query = {
			addressFrom: 'вул. Хрещатик, 1, Київ, Україна',
			addressTo:   'бул. Вацлава Гавела, 6з, Київ, Україна',
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
