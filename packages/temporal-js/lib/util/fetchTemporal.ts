import { IOptionsHandleTemporalApiCoreSetting, IOptionsTemporalFetch, ITemporalResponseData } from '../types';
import { convertToHeaders, ensureHeadersValue } from './fetchHeaders';
import { fetchWrapped } from './fetchWrapped';
import { buildTemporalApiHref } from '../buildTemporalApiUrl';

export function fetchTemporalCore<T = ITemporalResponseData<unknown>>(opts: IOptionsTemporalFetch, temporal: IOptionsHandleTemporalApiCoreSetting)
{
	opts.headers = convertToHeaders(opts.headers);

	if (temporal?.token?.length)
	{
		ensureHeadersValue(opts.headers, 'Authorization', `Bearer ${temporal.token}`);
	}

	return fetchWrapped<T>(opts)
}

export function fetchTemporal<T = ITemporalResponseData<unknown>>(opts: IOptionsTemporalFetch, temporal: IOptionsHandleTemporalApiCoreSetting)
{
	if (!opts.url.match(/^https?:\/\//)?.length)
	{
		opts.url = buildTemporalApiHref(opts.url, temporal)
	}

	return fetchTemporalCore<T>(opts, temporal)
}
