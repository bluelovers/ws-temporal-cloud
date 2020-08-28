import ipfsClient from 'ipfs-http-client';
import { ITemporalBaseConfig } from 'temporal-js2/lib/types';
import {
	ITemporalBaseConfigForIPFSHttpClientConfig,
	toIPFSHttpClientConfig,
} from 'temporal-js2/lib/toIPFSHttpClientConfig';

export function ipfsTemporalClient<T>(temporal: ITemporalBaseConfigForIPFSHttpClientConfig): T
{
	const ipfs = ipfsClient(toIPFSHttpClientConfig(temporal));

	return ipfs
}

export async function ipfsTemporalClientAsync<T>(temporal: ITemporalBaseConfigForIPFSHttpClientConfig)
{
	return ipfsTemporalClient<T>(temporal)
}

export { ipfsTemporalClientAsync as create }

export default ipfsTemporalClient
