import { ITemporalBaseConfig } from './types';

export interface ITemporalBaseConfigForIPFSHttpClientConfig extends Pick<ITemporalBaseConfig, 'ipfsEndpoint' | 'ipfsEndpointPort' | 'token'>
{

}

export function toIPFSHttpClientConfig(temporal: ITemporalBaseConfigForIPFSHttpClientConfig)
{
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
