import { handleTemporalApiCoreSetting } from './options';
import { IOptionsHandleTemporalApiCoreSetting } from './types';

export function buildTemporalApiURL(path?: string, options?: IOptionsHandleTemporalApiCoreSetting)
{
	options = handleTemporalApiCoreSetting(options);
	return new URL(`${options.version}/${path ?? ''}`, options.endpoint)
}

export function buildTemporalApiHref(path?: string, options?: IOptionsHandleTemporalApiCoreSetting)
{
	return buildTemporalApiURL(path, options).href
}
