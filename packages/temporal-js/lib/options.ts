import { prodURL, prodIPFSURL, devURL, devIPFSURL } from './const';
import { IOptionsHandleTemporalApiCoreSetting } from './types';

export function handleTemporalApiCoreSetting<T extends IOptionsHandleTemporalApiCoreSetting>(options: T = {} as any): T
{
	if (options.prod)
	{
		options.endpoint ??= prodURL;
		options.ipfsEndpoint ??= prodIPFSURL;
	}
	else
	{
		options.endpoint ??= devURL;
		options.ipfsEndpoint ??= devIPFSURL;
	}

	options.version ??= 'v2';

	return options
}
