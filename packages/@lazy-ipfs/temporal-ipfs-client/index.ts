import ipfsClient from 'ipfs-http-client';
import {
	ITemporalBaseConfigForIPFSHttpClientConfig,
	toIPFSHttpClientConfig,
} from '@lazy-ipfs/temporal-to-ipfs-http-client-config';

export function ipfsTemporalClient<T extends any = any>(temporal: ITemporalBaseConfigForIPFSHttpClientConfig): T
{
	const ipfs = ipfsClient(toIPFSHttpClientConfig(temporal));

	return ipfs
}

export async function ipfsTemporalClientAsync<T extends any = any>(temporal: ITemporalBaseConfigForIPFSHttpClientConfig)
{
	return ipfsTemporalClient<T>(temporal)
}

export { ipfsTemporalClientAsync as create }

export default ipfsTemporalClient
