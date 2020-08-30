import { assertTemporalConfig } from '../index';

test(`assertTemporalConfig`, () =>
{

	// @ts-ignore
	expect(() => assertTemporalConfig()).toThrowErrorMatchingSnapshot();

	expect(() => assertTemporalConfig({})).toThrowErrorMatchingSnapshot();

	expect(() => assertTemporalConfig({
		ipfsEndpoint: '',
	})).toThrowErrorMatchingSnapshot();

	expect(() => assertTemporalConfig({
		ipfsEndpoint: 'xxxxxxx',
		token: '',
	})).toThrowErrorMatchingSnapshot();

	expect(() => assertTemporalConfig({
		ipfsEndpoint: 'xxxxxxx',
		token: 'yyyyyyyy',
		ipfsEndpointPort: '' as any,
	})).toThrowErrorMatchingSnapshot();

	expect(() => assertTemporalConfig({
		ipfsEndpoint: 'xxxxxxx',
		token: 'yyyyyyyy',
		ipfsEndpointPort: 'kkk' as any,
	})).toThrowErrorMatchingSnapshot();

	expect(() => assertTemporalConfig({
		ipfsEndpoint: 'xxxxxxx',
		token: 'yyyyyyyy',
		ipfsEndpointPort: 777,
	})).not.toThrow();

	expect(() => assertTemporalConfig({
		ipfsEndpoint: 'xxxxxxx',
		token: 'yyyyyyyy',
		ipfsEndpointPort: null,
	})).not.toThrow();

	expect(() => assertTemporalConfig({
		ipfsEndpoint: 'xxxxxxx',
		token: 'yyyyyyyy',
		ipfsEndpointPort: void 0,
	})).not.toThrow();

});
