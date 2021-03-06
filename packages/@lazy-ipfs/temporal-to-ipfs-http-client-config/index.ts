import { ITemporalBaseConfig } from 'temporal-js2/lib/types';

export interface ITemporalBaseConfigForIPFSHttpClientConfig extends Pick<ITemporalBaseConfig, 'ipfsEndpoint' | 'ipfsEndpointPort' | 'token'>
{

}

export function isNullOrUndefined(value): value is null | undefined
{
	return value === void 0 || value === null
}

export function assertTemporalConfig<T extends Partial<ITemporalBaseConfigForIPFSHttpClientConfig>>(temporal: T): asserts temporal is T & {
	ipfsEndpoint: string,
	token: string,
}
{

	if (!temporal?.ipfsEndpoint?.length)
	{
		throw new TypeError(`temporal.ipfsEndpoint is required`)
	}

	if (!temporal?.token?.length)
	{
		throw new TypeError(`temporal.token is required`)
	}

	let port = temporal?.ipfsEndpointPort?.toString?.();

	if (!isNullOrUndefined(port) && (!port.length || port.match(/\D/)?.length))
	{
		throw new TypeError(`temporal.ipfsEndpointPort should is port, but got '${temporal.ipfsEndpointPort}'`)
	}

}

export function toIPFSHttpClientConfig<T extends Partial<ITemporalBaseConfigForIPFSHttpClientConfig>>(temporal: T)
{
	assertTemporalConfig(temporal);

	return {
		// the hostname (or ip address) of the endpoint providing the ipfs api
		host: temporal.ipfsEndpoint,
		// the port to connect on
		port: temporal.ipfsEndpointPort ?? 443,
		'api-path': '/api/v0/',
		// the protocol, https for security
		protocol: 'https',
		// provide the jwt within an authorization header
		headers: {
			authorization: 'Bearer ' + temporal.token,
		},
	}
}

export default toIPFSHttpClientConfig
